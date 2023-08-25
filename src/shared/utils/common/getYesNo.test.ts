import { getYesNo } from './getYesNo'

test('Если true возвращает "Да"', () => {
  expect(getYesNo(true)).toBe('Да')
})

test('Если false возвращает "Нет"', () => {
  expect(getYesNo(false)).toBe('Нет')
})
