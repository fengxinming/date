# date-smile

> Date formatting and parsing

## Usage

```js
import { parse } from 'date-smile';

expect(+parse('2018')).toBe(+moment('2018'));
expect(+parse('2018-08')).toBe(+moment('2018-08'));
expect(+parse('2018-08-01')).toBe(+moment('2018-08-01'));
expect(+parse('201810 121212')).toBe(+moment('2018-10-01 12:12:12'));
expect(+parse('2018-10 121212')).toBe(+moment('2018-10-01 12:12:12'));
expect(+parse('20181006 12:12:12')).toBe(+moment('2018-10-06 12:12:12'));
expect(+parse('20181006 12:13:13.123')).toBe(+moment('2018-10-06 12:13:13.123'));
expect(+parse('+072018-08-06')).toBe(+moment('+072018-08-06'));
expect(+parse('Date(2018-08-06)')).toBe(+moment('Date(2018-08-06)'));
expect(+parse('2018/10/09 07:04:10')).toBe(+moment('2018/10/09 07:04:10'));
expect(+parse('10/09/2018 07:04:10')).toBe(+moment('10/09/2018 07:04:10'));
expect(+parse('201810')).toBe(+moment('2018-10'));
expect(+parse('20181009')).toBe(+moment('2018-10-09'));
expect(+parse('20181009070410')).toBe(+moment('2018-10-09 07:04:10'));

expect(+parse('2018-08-01Z')).toBe(+moment('2018-08-01Z'));
expect(+parse('2018-08-01 12 +07:00')).toBe(+moment('2018-08-01 12:00:00 +07:00'));
expect(+parse('2018-08-06 12:12:12 +07:00')).toBe(+moment('2018-08-06 12:12:12 +07:00'));
expect(+parse('2018-08-06 12:12:12-07:00')).toBe(+moment('2018-08-06 12:12:12-07:00'));
expect(+parse('2018-08-06 12:12:12Z')).toBe(+moment('2018-08-06 12:12:12Z'));
expect(+parse('2018-08-06 12:12:12 Z')).toBe(+moment('2018-08-06 12:12:12 Z'));
expect(+parse('2018-08-06 12:12:12+07:00')).toBe(+moment('2018-08-06 12:12:12+07:00'));
expect(+parse('2018-08-06 12:12:12+07')).toBe(+moment('2018-08-06 12:12:12+07'));
expect(+parse('20181009070410Z')).toBe(+moment('2018-10-09 07:04:10Z'));
expect(+parse('20181009070410+07:00')).toBe(+moment('2018-10-09 07:04:10+07:00'));
expect(+parse('2018100907+07:00')).toBe(+moment('2018-10-09 07:00+07:00'));

expect(+parse(1533528720000)).toBe(+moment(1533528720000));
expect(+parse(moment([2018, 7, 5]))).toBe(+moment([2018, 7, 5]));
expect(+parse([2018])).toBe(+moment([2018]));
expect(+parse([2018, 7])).toBe(+moment([2018, 7]));
expect(+parse([2018, 7, 5])).toBe(+moment([2018, 7, 5]));
expect(+parse([2018, 7, 5, 9])).toBe(+moment([2018, 7, 5, 9]));
expect(+parse([2018, 7, 5, 13, 23])).toBe(+moment([2018, 7, 5, 13, 23]));
expect(+parse([2018, 7, 5, 13, 23, 52])).toBe(+moment([2018, 7, 5, 13, 23, 52]));
expect(+parse([2018, 7, 5, 13, 23, 52, 123])).toBe(+moment([2018, 7, 5, 13, 23, 52, 123]));

expect(+parse('2018-08-06 12:12:12.111+07:00', 'YYYY-MM-DD HH:mm:ss.SSSZ')).toBe(+moment('2018-08-06 12:12:12.111+07:00', 'YYYY-MM-DD HH:mm:ss.SSSZ'));
expect(+parse('2018-08-06 12:12:12.111 +07:00', 'YYYY-MM-DD HH:mm:ss.SSS')).toBe(+moment('2018-08-06 12:12:12.111+07:00', 'YYYY-MM-DD HH:mm:ss.SSS'));
expect(+parse('2018-08-06 12:12:12.333-08:00', 'YYYY-MM-DD HH:mm:ss.SSSZ')).toBe(+moment('2018-08-06 12:12:12.333-08:00', 'YYYY-MM-DD HH:mm:ss.SSSZ'));
expect(+parse('2018-08-06 12:12:12.333-0800', 'YYYY-MM-DD HH:mm:ss.SSSZZ')).toBe(+moment('2018-08-06 12:12:12.333-0800', 'YYYY-MM-DD HH:mm:ss.SSSZZ'));
expect(+parse('2018-08-06 12:12:12+07', 'YYYY-MM-DD HH:mm:ssZ')).toBe(+moment('2018-08-06 12:12:12+07', 'YYYY-MM-DD HH:mm:ssZ'));
expect(+parse('2018-08-06 12:12+07', 'YYYY-MM-DD HH:mmZ')).toBe(+moment('2018-08-06 12:12+07', 'YYYY-MM-DD HH:mmZ'));
expect(+parse('2018-08-06 12+07', 'YYYY-MM-DD HHZ')).toBe(+moment('2018-08-06 12+07', 'YYYY-MM-DD HHZ'));
expect(+parse('2018-08-06 12', 'YYYY-MM-DD HH Z')).toBe(+moment('2018-08-06 12', 'YYYY-MM-DD HH Z'));
expect(+parse('2018-08-06 12:12', 'YYYY-MM-DD HH:mm Z')).toBe(+moment('2018-08-06 12:12', 'YYYY-MM-DD HH:mm Z'));
expect(+parse('2018-08-06 12:12:12 Z', 'YYYY-MM-DD HH:mm:ss Z')).toBe(+moment('2018-08-06 12:12:12 Z', 'YYYY-MM-DD HH:mm:ss Z'));
expect(+parse('2018-08-06 12:12:12', 'YYYY-MM-DD HH:mm:ss Z')).toBe(+moment('2018-08-06 12:12:12', 'YYYY-MM-DD HH:mm:ss Z'));
expect(+parse('2018-08-06 12:12 Z', 'YYYY-MM-DD HH:mm Z')).toBe(+moment('2018-08-06 12:12 Z', 'YYYY-MM-DD HH:mm Z'));
expect(+parse('2018-08-06', 'YYYY-MM-DD')).toBe(+moment('2018-08-06', 'YYYY-MM-DD'));
expect(+parse('2018-08', 'YYYY-MM')).toBe(+moment('2018-08', 'YYYY-MM'));
expect(+parse('2018', 'YYYY')).toBe(+moment('2018', 'YYYY'));

```

```js
import { stringify } from 'date-smile';

expect(stringify(date1, 'YYYY-MM-DD HH:mm:ss')).toBe(date2.format('YYYY-MM-DD HH:mm:ss'));
expect(stringify(date1, 'YYYY-MM-DDTHH:mm:ss')).toBe(date2.format('YYYY-MM-DDTHH:mm:ss'));
expect(stringify(date1, 'YYYY-MM-DD')).toBe(date2.format('YYYY-MM-DD'));
expect(stringify(date1, 'yyyy-MM-dd')).toBe(date2.format('YYYY-MM-DD'));
expect(stringify(date1, 'YYYY/MM/DD')).toBe(date2.format('YYYY/MM/DD'));
expect(stringify(date1, 'YYYY-MM-DD hh:mm:ss')).toBe(date2.format('YYYY-MM-DD hh:mm:ss'));
expect(stringify(date1, 'YYYY-MM-DD HH:mm:ss')).toBe(date2.format('YYYY-MM-DD HH:mm:ss'));
expect(stringify(date1, 'YYYY-MM-DDTHH:mm:ss')).toBe(date2.format('YYYY-MM-DDTHH:mm:ss'));
expect(stringify(date1, 'YY/M/D')).toBe(date2.format('YY/M/D'));
expect(stringify(date1, 'YY-M-D H:m:s')).toBe(date2.format('YY-M-D H:m:s'));
expect(stringify(date1, 'd')).toBe(date2.format('d'));
expect(stringify(date1, 'YYYY-MM-DD hh:mm:ss.SSS')).toBe(date2.format('YYYY-MM-DD hh:mm:ss.SSS'));
expect(stringify(date1, 'YYYY-MM-DD hh:mm:ss.SSS +08:00')).toBe(date2.format('YYYY-MM-DD hh:mm:ss.SSS +08:00'));
expect(stringify(date1, 'YYYY-MM-DD hh:mm:ss.SSS -01:00')).toBe(date2.format('YYYY-MM-DD hh:mm:ss.SSS -01:00'));
expect(stringify(date1, 'YYYY-MM-DD hh:mm:ss.SSSZ')).toBe(date2.format('YYYY-MM-DD hh:mm:ss.SSSZ'));
expect(stringify(date1, 'YYYY-MM-DD hh:mm:ss.SSSZZ')).toBe(date2.format('YYYY-MM-DD hh:mm:ss.SSSZZ'));
expect(stringify(date1, 'YYYY-MM-DD hh:mm:ss Z')).toBe(date2.format('YYYY-MM-DD hh:mm:ss Z'));
expect(stringify(date1, 'YYYY-MM-DD hh:mm:ss ZZ')).toBe(date2.format('YYYY-MM-DD hh:mm:ss ZZ'));
expect(stringify(date1, '+YYYY-MM-DD HH:mm:ss')).toBe(date2.format('+YYYY-MM-DD HH:mm:ss'));
expect(stringify(date1, 'ISO')).toBe(date2.toISOString());
expect(stringify(date1, '[YYYY-MM-DD]')).toBe(date2.format('[YYYY-MM-DD]'));
```