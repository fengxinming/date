import isNil from 'celia/isNil';

export default function (date, y, m, d) {
  return +new Date(
    y || date.getFullYear(),
    isNil(m) ? date.getMonth() : m,
    d || date.getDate()
  );
}
