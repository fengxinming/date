import parse from '../src/parse';
import moment from 'moment';
import mockdate from 'mockdate';

describe('测试 parse 方法', () => {

  it('直接格式化', () => {
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

  });

  it('根据模板格式化', () => {
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

    mockdate.set('3/30/2000');
    expect(+parse()).toBe(+moment());
    expect(+parse([])).toBe(+moment([]));
    expect(+parse({})).toBe(+moment({}));
    mockdate.reset();
  });

});
