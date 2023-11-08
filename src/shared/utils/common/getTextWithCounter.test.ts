import { fakeWord } from '_tests_/utils'

import { getTextWithCounter } from './getTextWithCounter'

test('Возвращает только текст если массив пуст', () => {
  const text = fakeWord()
  const result = getTextWithCounter(text, [])
  expect(result).toBe(text)
})

test('Возвращает только текст с счётчиком если массив не пуст', () => {
  const text = fakeWord()
  const arr = [1, 2, 3]
  const result = getTextWithCounter(text, arr)
  expect(result).toBe(`${text} (${arr.length})`)
})
