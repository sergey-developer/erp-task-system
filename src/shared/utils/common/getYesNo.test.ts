import { getYesNo } from './getYesNo'

describe('Функция возвращающая Да/Нет', () => {
  test('Если true возвращает Да', () => {
    expect(getYesNo(true)).toBe('Да')
  })

  test('Если false возвращает Нет', () => {
    expect(getYesNo(false)).toBe('Нет')
  })
})
