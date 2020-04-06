import isValidDate from './isValidDate';

const FORMAT_RE = /\[([^\]]+)]|Y{2,4}|y{2,4}|M{1,2}|D{1,2}|d{1,2}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

export default function (date, inputString) {
  if (!isValidDate(date)) {
    return 'Invalid Date';
  } else if (!inputString) {
    inputString = 'YYYY-MM-DDTHH:mm:ssZ';
  } else if (inputString === 'ISO') {
    return date.toISOString();
  }

  const offset = (new Date()).getTimezoneOffset();
  return inputString.replace(FORMAT_RE, (matched) => {
    switch (matched) {
      case 'YY':
        return String(date.getFullYear()).slice(-2);
      case 'YYYY':
      case 'yyyy':
        return date.getFullYear();
      case 'M':
        return date.getMonth() + 1;
      case 'MM':
        return padLeft(date.getMonth() + 1);
      case 'D':
        return date.getDate();
      case 'd':
        return date.getDay();
      case 'DD':
      case 'dd':
        return padLeft(date.getDate());
      case 'H':
        return date.getHours();
      case 'HH':
        return padLeft(date.getHours());
      case 'h':
        return h12(date.getHours());
      case 'hh':
        return padLeft(h12(date.getHours()));
      case 'a':
        return date.getHours() < 12 ? 'am' : 'pm';
      case 'A':
        return date.getHours() < 12 ? 'AM' : 'PM';
      case 'm':
        return date.getMinutes();
      case 'mm':
        return padLeft(date.getMinutes());
      case 's':
        return date.getSeconds();
      case 'ss':
        return padLeft(date.getSeconds());
      case 'SSS':
        return padLeft(date.getMilliseconds(), 3);
      case 'Z':
        return timezone(offset, ':');
      case 'ZZ':
        return timezone(offset, '');
      default:
        return matched.slice(1, -1);
    }
  });
}

const ZERO = '00';
function padLeft(val, len = 2) {
  return (ZERO + val).slice(-len);
}

function timezone(minutes, sep) {
  let prefix;
  if (minutes > 0) {
    prefix = '-';
  } else {
    prefix = '+';
    minutes = -minutes;
  }
  return `${prefix}${padLeft(Math.floor(minutes / 60))}${sep}${padLeft(Math.floor(minutes % 60))}`;
}

function h12(hours) {
  hours = hours || 24;
  return hours > 12 ? hours - 12 : hours;
}
