import { addDotToEnd, getFirstLetterInUpperCase } from 'shared/utils/string'

import { fakeWord } from '_tests_/utils'

import { getShortUserName } from './getShortUserName'

test('Возвращает значения разделённые пробелами', () => {
  const firstName = fakeWord()
  const lastName = fakeWord()
  const middleName = fakeWord()
  const result = getShortUserName({ firstName, lastName, middleName })

  expect(result).toBe(
    `${lastName} ${addDotToEnd(getFirstLetterInUpperCase(firstName))} ${addDotToEnd(
      getFirstLetterInUpperCase(middleName),
    )}`,
  )
})
