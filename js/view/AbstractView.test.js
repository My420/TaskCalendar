import AbstractView from './AbstractView';

describe('Test AbstractView class', () => {
  test('Must throw an error when trying to create an instance of a class', () => {
    const createView = () => {
      return new AbstractView();
    };

    expect(createView).toThrow(
      `Can't instantiate BaseComponent, only concrete one.`
    );
  });

  test('Must throw an error when template not defined', () => {
    const createTestClass = () => {
      class TestClass extends AbstractView {}
      return new TestClass().template;
    };

    expect(createTestClass).toThrow(`You have to define a template.`);
  });
});
