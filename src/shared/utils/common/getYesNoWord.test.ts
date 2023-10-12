import { getYesNoWord } from './getYesNoWord'

describe('Функция возвращающая Да/Нет', () => {
  test('Если true возвращает Да', () => {
    expect(getYesNoWord(true)).toBe('Да')
  })

  test('Если false возвращает Нет', () => {
    expect(getYesNoWord(false)).toBe('Нет')
  })
})
