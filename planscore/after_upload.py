import boto3, pprint, os, io, json, urllib.parse
import itsdangerous
from osgeo import ogr
from . import util, data, score, website, prepare_state

ogr.UseExceptions()

def get_uploaded_info(s3, bucket, key, id):
    '''
    '''
    object = s3.get_object(Bucket=bucket, Key=key)
    upload = data.Upload(id, key, [])
    
    with util.temporary_buffer_file(os.path.basename(key), object['Body']) as path:
        scored_upload, output = score.score_plan(s3, bucket, upload, path, 'data/XX')
        put_geojson_file(s3, bucket, scored_upload, path)
    
    put_upload_index(s3, bucket, scored_upload)
    
    return output

def put_geojson_file(s3, bucket, upload, path):
    ''' Save a property-less GeoJSON file for this upload.
    '''
    key = upload.geometry_key()
    ds = ogr.Open(path)
    geometries = []
    
    if not ds:
        raise RuntimeError('Could not open file')

    for (index, feature) in enumerate(ds.GetLayer(0)):
        geometry = feature.GetGeometryRef()
        if geometry.GetSpatialReference():
            geometry.TransformTo(prepare_state.EPSG4326)
        geometries.append(geometry.ExportToJson(options=['COORDINATE_PRECISION=7']))

    features = ['{"type": "Feature", "properties": {}, "geometry": '+g+'}' for g in geometries]
    geojson = '{"type": "FeatureCollection", "features": [\n'+',\n'.join(features)+'\n]}'
    
    s3.put_object(Bucket=bucket, Key=key, Body=geojson.encode('utf8'),
        ContentType='text/json', ACL='public-read')

def put_upload_index(s3, bucket, upload):
    ''' Save a JSON index file for this upload.
    '''
    key = upload.index_key()
    body = upload.to_json().encode('utf8')

    s3.put_object(Bucket=bucket, Key=key, Body=body,
        ContentType='text/json', ACL='public-read')

def get_redirect_url(website_base, id):
    '''
    '''
    rules = {rule.endpoint: str(rule) for rule in website.app.url_map.iter_rules()}
    redirect_url = urllib.parse.urljoin(website_base, rules['get_plan'])

    return '{}?{}'.format(redirect_url, id)

def lambda_handler(event, context):
    '''
    '''
    s3 = boto3.client('s3')
    query = util.event_query_args(event)
    secret = os.environ.get('PLANSCORE_SECRET', 'fake')
    website_base = os.environ.get('WEBSITE_BASE', 'https://planscore.org/')

    try:
        id = itsdangerous.Signer(secret).unsign(query['id']).decode('utf8')
    except itsdangerous.BadSignature:
        return {
            'statusCode': '400',
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': 'Bad ID'
            }
    
    summary = get_uploaded_info(s3, query['bucket'], query['key'], id)
    redirect_url = get_redirect_url(website_base, id)
    return {
        'statusCode': '302',
        'headers': {'Location': redirect_url},
        'body': summary
        }

if __name__ == '__main__':
    pass
