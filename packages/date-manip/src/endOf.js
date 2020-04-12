import normalizeUnit, { YEAR, MONTH, DATE, DAY, HOUR, MINUTE, SECOND } from './_/normalizeUnit';
import { MS_IN_SECOND, MS_IN_MINUTE, MS_IN_HOUR, MS_IN_DAY } from './_/ms';
import startOfDate from './_/startOfDate';
import startOfTime from './_/startOfTime';

export default function (date, unit) {
  unit = normalizeUnit(unit);

  let time = 0;

  switch (unit) {
    case YEAR:
      time = startOfDate(date, date.getFullYear() + 1, 0, 1) - 1;
      break;
    case MONTH:
      time = startOfDate(date, null, date.getMonth() + 1, 1) - 1;
      break;
    case DATE:
    case DAY:
      time = startOfDate(date) + MS_IN_DAY - 1;
      break;
    case HOUR:
      time = startOfTime(date, MS_IN_HOUR) + MS_IN_HOUR - 1;
      break;
    case MINUTE:
      time = startOfTime(date, MS_IN_MINUTE) + MS_IN_MINUTE - 1;
      break;
    case SECOND:
      time = startOfTime(date, MS_IN_SECOND) + MS_IN_SECOND - 1;
      break;
  }

  time && date.setTime(time);

  return date;
}
