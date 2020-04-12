import iterate from 'celia/_iterate';

export const YEAR = 'year';
export const MONTH = 'month';
export const DATE = 'date';
export const DAY = 'day';
export const HOUR = 'hour';
export const MINUTE = 'minute';
export const SECOND = 'second';
export const MILLISECOND = 'millisecond';
export const TIME = 'time';

// 构建映射集合
const unitMappings = {};
function mapUnit(key) {
  iterate(arguments, 0, arguments.length, (arg) => {
    unitMappings[arg] = key;
  });
}
mapUnit(YEAR, 'Y');
mapUnit(MONTH, 'M');
mapUnit(DATE, 'D');
mapUnit(DAY, 'days', 'd');
mapUnit(HOUR, 'hours', 'h');
mapUnit(MINUTE, 'minutes', 'm');
mapUnit(SECOND, 'seconds', 's');
mapUnit(MILLISECOND, 'milliseconds', 'ms');
mapUnit(TIME, 't');

export default function (u) {
  return unitMappings[u];
}
