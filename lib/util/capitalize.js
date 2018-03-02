/**
 * Default list of exceptions not to capitalize
 * @type {[*]}
 * @private
 */
const _exceptions = [
  'de', 'di', 'do', 'da', 'dos', 'das', 'dello', 'della', 'dalla', 'dal',
  'del', 'e', 'em', 'na', 'no', 'nas', 'nos', 'van', 'von', 'y',
];

/**
 * Capitalize single string
 */
export const capitalize = str => str.substr(0, 1).toUpperCase() + str.substring(1).toLowerCase();

/**
 * Capitalize all strings
 * @param str
 * @param exceptions
 * @returns {string}
 */
export default (str, exceptions = _exceptions) => {
  if (typeof str !== 'string') return str;
  const s = str.split(' ');
  for (const i in s) { //eslint-disable-line
    if (exceptions.indexOf(s[i].toLowerCase()) === -1) {
      s[i] = capitalize(s[i]);
    } else {
      s[i] = s[i].toLowerCase();
    }
  }
  return s.join(' ');
};
