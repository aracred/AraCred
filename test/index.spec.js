/* eslint-disable import/newline-after-import */
const sayHello = require('../src/index')
test('sayHello', () => {
  expect(sayHello.default('foo')).toBe('Hello, foo!')
})
