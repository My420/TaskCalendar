import createElement from './createElement';

describe('test createElement function', () => {
  const template = `<div class='testDiv'>
        <span class='testSpan'>Test</span>
    </div>`;
  const element = createElement(template);

  test('function should return document fragment', () => {
    expect(element.nodeName).toBe('#document-fragment');
  });

  test('function should work correct', () => {
    const templateDiv = element.querySelector('.testDiv');
    const templateSpan = element.querySelector('.testSpan');
    expect(templateDiv.tagName).toBe('DIV');
    expect(templateSpan.tagName).toBe('SPAN');
    expect(templateSpan.innerHTML).toBe('Test');
  });
});
