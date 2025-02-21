// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

/**
 * При срабатывании валидации формы ant design показывался warning, даже если валидация сработала правильно
 * Пример проблемы - https://stackoverflow.com/questions/64128556/ant-design-form-async-validator-warning
 * Решение - https://github.com/yiminghe/async-validator
 */
import Schema from 'async-validator'

jest.setTimeout(60000)

Schema.warning = function () {}

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})

window.URL.createObjectURL = jest.fn()
window.URL.revokeObjectURL = jest.fn()
