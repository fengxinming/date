export default function (date, ms) {
  const input = +date;
  return input - input % ms;
}
