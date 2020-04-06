import moment from 'moment';
import mockdate from 'mockdate';
import stringify from '../src/stringify';
import parse from '../src/parse';

let date1;
let date2;

beforeAll(() => {
  date1 = new Date();
  date2 = moment(+date1);
});

afterAll(() => {
  date1 = undefined;
  date2 = undefined;
});

describe('测试 format 方法', () => {
  it('格式化空模板', () => {
    expect(stringify(date1)).toBe(date2.format());
  });

  it('格式化错误的时间', () => {
    expect(stringify(new Date('otherString'))).toBe(new Date('otherString').toString());
  });

  it('格式化 Year YY YYYY', () => {
    expect(stringify(date1, 'YY')).toBe(date2.format('YY'));
    expect(stringify(date1, 'YYYY')).toBe(date2.format('YYYY'));
  });

  it('格式化 Month M MM', () => {
    expect(stringify(date1, 'M')).toBe(date2.format('M'));
    expect(stringify(date1, 'MM')).toBe(date2.format('MM'));
  });

  it('格式化 Day of Month D DD 1 - 31', () => {
    expect(stringify(date1, 'D')).toBe(date2.format('D'));
    expect(stringify(date1, 'DD')).toBe(date2.format('DD'));
  });

  it('格式化 Hour H HH 24-hour', () => {
    expect(stringify(date1, 'H')).toBe(date2.format('H'));
    expect(stringify(date1, 'HH')).toBe(date2.format('HH'));
  });

  it('格式化 Hour h hh 12-hour', () => {
    const time = '2018-05-02T00:00:00.000';
    const expected = '12';
    expect(stringify(parse(time), 'h')).toBe(expected);
    expect(stringify(parse(time), 'h')).toBe(moment(time).format('h'));
    expect(stringify(parse(time), 'hh')).toBe(expected);
    expect(stringify(parse(time), 'hh')).toBe(moment(time).format('hh'));

    const time2 = '2018-05-02T01:00:00.000';
    expect(stringify(parse(time2), 'h')).toBe(moment(time2).format('h'));
    expect(stringify(parse(time2), 'h')).toBe('1');
    expect(stringify(parse(time2), 'hh')).toBe(moment(time2).format('hh'));
    expect(stringify(parse(time2), 'hh')).toBe('01');

    const time3 = '2018-05-02T23:00:00.000';
    const expected3 = '11';
    expect(stringify(parse(time3), 'h')).toBe(moment(time3).format('h'));
    expect(stringify(parse(time3), 'h')).toBe(expected3);
    expect(stringify(parse(time3), 'hh')).toBe(moment(time3).format('hh'));
    expect(stringify(parse(time3), 'hh')).toBe(expected3);
  });

  it('格式化正午 a A am / pm', () => {
    const time = '2018-05-02T01:00:00.000';
    expect(stringify(parse(time), 'a')).toBe('am');
    expect(stringify(parse(time), 'a')).toBe(moment(time).format('a'));
    expect(stringify(parse(time), 'A')).toBe('AM');
    expect(stringify(parse(time), 'A')).toBe(moment(time).format('A'));

    const time2 = '2018-05-02T23:00:00.000';
    expect(stringify(parse(time2), 'a')).toBe('pm');
    expect(stringify(parse(time2), 'a')).toBe(moment(time2).format('a'));
    expect(stringify(parse(time2), 'A')).toBe('PM');
    expect(stringify(parse(time2), 'A')).toBe(moment(time2).format('A'));
  });

  it('格式化 Minute m mm', () => {
    expect(stringify(date1, 'm')).toBe(date2.format('m'));
    expect(stringify(date1, 'mm')).toBe(date2.format('mm'));
  });

  it('格式化 Second s ss SSS', () => {
    expect(stringify(date1, 's')).toBe(date2.format('s'));
    expect(stringify(date1, 'ss')).toBe(date2.format('ss'));
    expect(stringify(date1, 'SSS')).toBe(date2.format('SSS'));
    const date = '2011-11-05T14:48:01.002Z';
    expect(stringify(parse(date), 's-ss-SSS')).toBe(moment(date).format('s-ss-SSS'));
  });

  it('Format Time Zone ZZ', () => {
    mockdate.set(new Date('2018-05-02T23:00:00.000'), 60 * 8);
    expect(stringify(date1, 'Z')).toBe(date2.format('Z'));
    expect(stringify(date1, 'ZZ')).toBe(date2.format('ZZ'));
    mockdate.set(new Date('2018-05-02T23:00:00.000'), 60 * 8 * -1);
    expect(stringify(date1, 'ZZ')).toBe(date2.format('ZZ'));
    mockdate.set(new Date('2018-05-02T23:00:00.000'), 0);
    expect(stringify(date1, 'ZZ')).toBe(date2.format('ZZ'));
    mockdate.set(new Date('2018-05-02T23:00:00.000'), 60 * 10);
    expect(stringify(date1, 'ZZ')).toBe(date2.format('ZZ'));
    mockdate.set(new Date('2018-05-02T23:00:00.000'), 60 * 11 * -1);
    expect(stringify(date1, 'ZZ')).toBe(date2.format('ZZ'));
    mockdate.set(new Date('2018-05-02T23:00:00.000'), 60 * 5.5 * -1);
    expect(stringify(date1, 'ZZ')).toBe(date2.format('ZZ'));
  });

  it('格式化 token value is 0', () => {
    const sundayDate = '2000-01-02';
    const sundayStr = 'd H m s';
    expect(stringify(parse(sundayDate), sundayStr))
      .toBe(moment(sundayDate).format(sundayStr));
  });

  it('格式化复杂字符 - : / ', () => {
    const string = 'YY-M-D / HH:mm:ss';
    expect(stringify(date1, string)).toBe(date2.format(string));
  });

  it('综合格式化', () => {
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
  });
});
