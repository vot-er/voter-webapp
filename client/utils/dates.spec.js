import {getFormattedDateTime} from './dates';

describe('Date Helper', () => {
  describe('getFormattedDateTime', () => {
    it('returns mm/dd hh:mm:ss formatted time when passed a date', () => {
      // arrange
      // The 7 numbers specify the year, month, day, hour, minute, second, and millisecond, in that order
      const date = new Date(99, 0, 24, 11, 33, 30, 0);

      // assert
      expect(getFormattedDateTime(date)).toEqual('1/24 11:33:30');
    });

    it('pads single digit minute and second values with leading zeros', () => {
      // arrange
      // The 7 numbers specify the year, month, day, hour, minute, second, and millisecond, in that order
      const date = new Date(99, 0, 4, 11, 3, 2, 0);

      // assert
      expect(getFormattedDateTime(date)).toEqual('1/4 11:03:02');
    });

    it('returns next month time when passed a leap day in a non-leap year', () => {
      // arrange
      const date = new Date(21, 1, 29, 11, 3, 2, 0);

      // assert it moves to next month
      expect(getFormattedDateTime(date)).toEqual('3/1 11:03:02');
    });
  });
});
