import valueOr from './valueOr'

const trulyValues = [true, 'string', 1, {}, []]
const falsyValues = [false, '', 0, null, undefined, NaN]
const defaultValue = 'default'

describe('Возвращает', () => {
  test('Переданное значение если оно truly', () => {
    trulyValues.forEach((value) => {
      const result = valueOr(value, defaultValue)
      expect(result).toBe(value)
      expect(result).not.toBe(defaultValue)
    })
  })

  test('Значение по умолчанию если переданное значение falsy', () => {
    falsyValues.forEach((value) => {
      const result = valueOr(value, defaultValue)
      expect(result).toBe(defaultValue)
      expect(result).not.toBe(value)
    })
  })
})
