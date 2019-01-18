// test cases
const testCase = 'The 10 little men bought 19 fish, 50 snails, and 87 clams.\n';
const testCase2 = 'Number of meals per day: 3.\n';
const testCase3 = 'John turned 8, then turned 9.\n';
const testCase4 = '49 miners were stuck in the mine for 22 days without food or water.\n';

// num-to-word map
const numberWords = {
  digitCombos: {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety'
  },
  singleDigits: {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine'
  },
  doubleDigits: {
    2: 'twenty',
    3: 'thirty',
    4: 'forty',
    5: 'fifty',
    6: 'sixty',
    7: 'seventy',
    8: 'eighty',
    9: 'ninety'
  }
};

// sanitize value and restore syntax if present
const sanitizeAndRestoreStr = str => {
  let result;

  if (str.split(',').length === 2) {
    // we know the number or word has a comma attached
    // in an ideal word, we restore that
    const num = str.split(',')[0];
    result = convertNumber(num);
    result += ',';
  } else if (str.split('.').length === 2) {
    // else we know it ends in a period
    const num = str.split('.')[0];
    result = convertNumber(num);
    result += '.';
  } else {
    // otherwise, return the value as is and execute the conversion
    result = convertNumber(str);
  }
  return result;
};

const convertNumber = str => {
  let modifiedNum;

  // entertain single numbers or comboWords first
  if (str in numberWords.digitCombos) {
    modifiedNum = numberWords.digitCombos[str];
  } else {
    // entertain double numbers and eval each num individually
    const doubleNumArr = str.split('');
    let doubleModifiedNum = '';
    for (let i = 0; i < doubleNumArr.length; i++) {
      if (!i) {
        if (doubleNumArr[i] in numberWords.doubleDigits) {
          doubleModifiedNum += `${numberWords.doubleDigits[doubleNumArr[i]]}-`;
        }
      } else {
        if (doubleNumArr[i] in numberWords.singleDigits) {
          doubleModifiedNum += numberWords.singleDigits[doubleNumArr[i]];
        }
      }
    }
    modifiedNum = doubleModifiedNum;
  }

  return modifiedNum ? modifiedNum : str;
};

// conversion higher-order function
const convert1through99 = str => {
  const shouldBeCapitalized = str.split(' ')[0].split('')[0] in numberWords.singleDigits;
  let result = str
    .split(' ')
    .map(string => {
      return sanitizeAndRestoreStr(string);
    })
    .join(' ');
  // uppercase converted number if at front of string
  result = shouldBeCapitalized ? result.charAt(0).toUpperCase() + result.substr(1) : result;
  console.log(result);
  return result;
};

convert1through99(testCase);
convert1through99(testCase2);
convert1through99(testCase3);
convert1through99(testCase4);
