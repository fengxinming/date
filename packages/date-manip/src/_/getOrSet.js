import normalizeUnit, { YEAR, MONTH, DAY, HOUR, MINUTE, SECOND, MILLISECOND, DATE, TIME } from './normalizeUnit';
import { MS_IN_DAY } from './ms';

const dateProto = Date.prototype;
/* eslint no-extend-native: 0 */
if (!dateProto.setDay) {
  dateProto.setDay = function (val) {
    const day = this.getDay();
    if (val !== day) {
      this.setTime(+this + ((val - day) * MS_IN_DAY));
    }
  };
}

const mapping = {
  [YEAR]: 'FullYear',
  [MONTH]: 'Month',
  [DATE]: 'Date',
  [DAY]: 'Day',
  [HOUR]: 'Hours',
  [MINUTE]: 'Minutes',
  [SECOND]: 'Seconds',
  [MILLISECOND]: 'Milliseconds',
  [TIME]: 'Time'
};

export function get(date, unit) {
  const method = mapping[normalizeUnit(unit)];
  return date[`get${method || 'Time'}`]();
}

export function set(date, unit, val) {
  const method = mapping[normalizeUnit(unit)];
  method && date[`set${method}`](val);
  return date;
}
