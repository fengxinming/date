import normalizeUnit, { YEAR, MONTH, DATE, DAY, HOUR, MINUTE, SECOND } from './_/normalizeUnit';
import { MS_IN_SECOND, MS_IN_MINUTE, MS_IN_HOUR } from './_/ms';
import startOfDate from './_/startOfDate';
import startOfTime from './_/startOfTime';

export default function (date, unit) {
  unit = normalizeUnit(unit);

  let time = 0;

  switch (unit) {
    case YEAR:
      time = startOfDate(date, null, 0, 1);
      break;
    case MONTH:
      time = startOfDate(date, null, null, 1);
      break;
    case DATE:
    case DAY:
      time = startOfDate(date);
      break;
    case HOUR:
      time = startOfTime(date, MS_IN_HOUR);
      break;
    case MINUTE:
      time = startOfTime(date, MS_IN_MINUTE);
      break;
    case SECOND:
      time = startOfTime(date, MS_IN_SECOND);
      break;
  }

  time && date.setTime(time);

  return date;
}
