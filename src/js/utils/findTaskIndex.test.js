import * as fc from 'fast-check';
import findTaskIndex from './findTaskIndex';

describe('test findTaskIndex function', () => {
  const arr = [
    { taskId: 'a1' },
    { taskId: 'a2' },
    { taskId: 'a3' },
    { taskId: 'a4' }
  ];

  test('function should return correct index', () => {
    expect(findTaskIndex(arr, 'a4')).toBe(3);
    expect(findTaskIndex(arr, 'a2')).toBe(1);
    expect(findTaskIndex(arr, 'a1')).toBe(0);
  });

  test('function should return undefined if element does not exist', () => {
    expect(findTaskIndex(arr, 'test')).toBeUndefined();
    expect(findTaskIndex(arr, 'a5')).toBeUndefined();
    expect(findTaskIndex(arr, 'a8')).toBeUndefined();
  });

  test('should return correct index', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({ taskId: fc.hexaString(5, 5) }), 20, 20),
        fc.integer(0, 19),
        (tasks, index) => {
          const elementId = tasks[index].taskId;
          expect(findTaskIndex(tasks, elementId)).toBe(index);
        }
      )
    );
  });
});
