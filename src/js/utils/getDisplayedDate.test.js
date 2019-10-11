import * as fc from 'fast-check';
import getDisplayedDate from './getDisplayedDate';
import { MONTH_MAP } from './constant';

describe('test getDisplayedDate function', () => {
  test('function should correct return full date', () => {
    fc.assert(
      fc.property(
        fc.integer(1000, 3000),
        fc.integer(1, 12),
        fc.integer(1, 28),
        (y, m, d) => {
          const month = m < 10 ? `0${m}` : m;
          const day = d < 10 ? `0${d}` : `${d}`;
          const stringDate = `${y}-${month}-${day}T${day}:${day}:${day}.128Z`;
          const expected = `${day} ${MONTH_MAP[month].dir} ${y}`;
          expect(getDisplayedDate(stringDate, true)).toBe(expected);
        }
      )
    );
  });

  test('function should correct return not full date', () => {
    fc.assert(
      fc.property(
        fc.integer(1000, 3000),
        fc.integer(1, 12),
        fc.integer(1, 28),
        (y, m, d) => {
          const month = m < 10 ? `0${m}` : m;
          const day = d < 10 ? `0${d}` : `${d}`;
          const stringDate = `${y}-${month}-${day}T${day}:${day}:${day}.128Z`;
          const expected = `${MONTH_MAP[month].sub} ${y}`;
          expect(getDisplayedDate(stringDate)).toBe(expected);
        }
      )
    );
  });
});
