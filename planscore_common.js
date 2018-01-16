//
// SHARED CONSTANTS
//

// the list of years to offer; used by the year picker so the user may choose dates
// note that not every state has data at all levels for every year
export const PLAN_YEARS = [
    1972, 1974, 1976, 1978,
    1980, 1982, 1984, 1986, 1988,
    1990, 1992, 1994, 1996, 1998,
    2000, 2002, 2004, 2006, 2008,
    2010, 2012, 2014, 2016,
];

// the color gradient from Republican red to Democrat blue
// see also lookupBias() which resolves a score (-1 to +1) into colors & descriptions
export const COLOR_GRADIENT = require('tinygradient').rgb(['#C71C36', '#F2E5FA', '#0049A8'], 100).map((tinycolor) => { return tinycolor.toHexString(); });

// technically bias scores range -1 to +1, but realistically we scale to a narrower band (25% bias is a lot!)
// this defines the spread to consider when scaling a score onto a color ramp or similar
// see also lookupBias() which resolves a score (-1 to +1) into colors & descriptions
export const BIAS_SPREAD_SCALING = 0.25;

// a bias <= this value will be considered balanced and below statistical significance
// see also lookupBias() which resolves a score (-1 to +1) into colors & descriptions
export const BIAS_BALANCED_THRESHOLD = 0.02;

// for remapping state name to a short code
export const STATE_NAME_TO_CODE = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY',
};

// for remapping state short code to a name
export const STATE_CODE_TO_NAME = {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming',
};

// bounding box of continental US
// and of the individual states
export const CONUS_BOUNDS = [ [19.80, -134.82], [53.85, -60.29] ];
export const STATE_BOUNDING_BOXES = {
    'AL': [ [30.14443, -88.47323], [35.00803, -84.88825] ],
    'AK': [ [51.17509, -179.23109], [71.44106], [179.85968] ],
    'AZ': [ [31.33218, -114.81659], [37.00372, -109.04517] ],
    'AR': [ [33.00411, -94.61792], [36.49975, -89.64440] ],
    'CA': [ [32.52883, -124.48200], [42.00952, -114.13121] ],
    'CO': [ [36.99242, -109.06020], [41.00344, -102.04152] ],
    'CT': [ [40.95094, -73.72777], [42.05059, -71.78724] ],
    'DE': [ [38.45113, -75.78902], [39.83952, -74.98416] ],
    'FL': [ [24.39631, -87.63490], [31.00097, -79.97431] ],
    'GA': [ [30.35576, -85.60517], [35.00066, -80.75143] ],
    'HI': [ [18.86546, -178.44359], [28.51727, -154.75579] ],
    'ID': [ [41.98818, -117.24303], [49.00115, -111.04350] ],
    'IL': [ [36.97030, -91.51308], [42.50848, -87.01993] ],
    'IN': [ [37.77173, -88.09789], [41.76137, -84.78459] ],
    'IA': [ [40.37544, -96.63949], [43.50120, -90.14006] ],
    'KS': [ [36.99302, -102.05177], [40.00317, -94.58839] ],
    'KY': [ [36.49706, -89.57120], [39.14773, -81.96479] ],
    'LA': [ [28.85513, -94.04335], [33.01954, -88.75839] ],
    'ME': [ [42.91713, -71.08392], [47.45985, -66.88544] ],
    'MD': [ [37.88660, -79.48765], [39.72304, -74.98628] ],
    'MA': [ [41.18705, -73.50814], [42.88679, -69.85886] ],
    'MI': [ [41.69612, -90.41839], [48.30606, -82.12297] ],
    'MN': [ [43.49936, -97.23920], [49.38436, -89.48339] ],
    'MS': [ [30.13985, -91.65501], [34.99610, -88.09789] ],
    'MO': [ [35.99568, -95.77470], [40.61364, -89.09897] ],
    'MT': [ [44.35792, -116.04915], [49.00110, -104.03969] ],
    'NE': [ [39.99993, -104.05351], [43.00171, -95.30829] ],
    'NV': [ [35.00186, -120.00647], [42.00221, -114.03946] ],
    'NH': [ [42.69699, -72.55718], [45.30548, -70.57509] ],
    'NJ': [ [38.78866, -75.56359], [41.35742, -73.88506] ],
    'NM': [ [31.33217, -109.05017], [37.00029, -103.00196] ],
    'NY': [ [40.47740, -79.76259], [45.01587, -71.77749] ],
    'NC': [ [33.75288, -84.32187], [36.58816, -75.40012] ],
    'ND': [ [45.93507, -104.04927], [49.00069, -96.55441] ],
    'OH': [ [38.40342, -84.82030], [42.32713, -80.51871] ],
    'OK': [ [33.61579, -103.00246], [37.00231, -94.43101] ],
    'OR': [ [41.99179, -124.70354], [46.29910, -116.46326] ],
    'PA': [ [39.71980, -80.51985], [42.51607, -74.68950] ],
    'RI': [ [41.09583, -71.90726], [42.01880, -71.08857] ],
    'SC': [ [32.03345, -83.35393], [35.21554, -78.49930] ],
    'SD': [ [42.47969, -104.05788], [45.94538, -96.43647] ],
    'TN': [ [34.98292, -90.31030], [36.67826, -81.64690] ],
    'TX': [ [25.83716, -106.64565], [36.50070, -93.50804] ],
    'UT': [ [36.99766, -114.05289], [42.00170, -109.04157] ],
    'VT': [ [42.72685, -73.43791], [45.01666, -71.46504] ],
    'VA': [ [36.54076, -83.67539], [39.46601, -75.16643] ],
    'WA': [ [45.54354, -124.84897], [49.00249, -116.91558] ],
    'WV': [ [37.20154, -82.64459], [40.63880, -77.71952] ],
    'WI': [ [42.49172, -92.88943], [47.30982, -86.24955] ],
    'WY': [ [40.99477, -111.05456], [45.00582, -104.05225] ],
};


//
// SHARED UTILITY FUNCTIONS
//

// return a structure of information about the given EG bias score: whether it's strong or weak, D or R, etc.
export const lookupBias = (score) => {
    if (score === undefined || score === null) return 'No Data';

    const abscore = Math.abs(score);

    const party = abscore > BIAS_BALANCED_THRESHOLD ? (score > 0 ? 'Democrat' : 'Republican') : '';
    const partycode = party.substr(0, 1).toLowerCase();

    let description = 'No Significant Bias';
    if (abscore >= 0.20) description = `Most Biased In Favor of ${party}`;
    if (abscore >= 0.14) description = `More Biased In Favor of ${party}`;
    if (abscore >= 0.07) description = `Biased In Favor of ${party}`;
    if (abscore >= BIAS_BALANCED_THRESHOLD) description = `Slightly Biased In Favor of ${party}`;

    let extremity = 0;
    if (abscore >= 0.14) extremity = 3;
    if (abscore >= 0.07) extremity = 2;
    if (abscore >= BIAS_BALANCED_THRESHOLD) extremity = 1;

    // normalize the score onto an absolute scale from 0 (-max) to 1 (+max); that gives us the index of the color gradient entry
    const bias_spread = BIAS_SPREAD_SCALING;
    let p_value = 0.5 + (0.5 * (score / bias_spread));
    if (p_value < 0) p_value = 0;
    else if (p_value > 1) p_value = 1;
    const color = COLOR_GRADIENT[ Math.round((COLOR_GRADIENT.length - 1) * p_value) ];

    return {
        party: party,
        partycode: partycode,
        color: color,
        extremity: extremity,
        description: description,
    };
};
