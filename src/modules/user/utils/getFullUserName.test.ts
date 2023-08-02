import { FunctionParams } from 'shared/types/utils'

import { fakeWord } from '_tests_/utils'

import { getFullUserName } from './getFullUserName'

describe('Возвращает корректное значение', () => {
  test('Если все данные переданы', () => {
    const args: FunctionParams<typeof getFullUserName> = {
      firstName: fakeWord(),
      lastName: fakeWord(),
      middleName: fakeWord(),
    }

    const expectedResult = `${args.lastName} ${args.firstName} ${args.middleName}`
    expect(getFullUserName(args)).toBe(expectedResult)
  })

  test('Если middleName не передан', () => {
    const args: FunctionParams<typeof getFullUserName> = {
      firstName: fakeWord(),
      lastName: fakeWord(),
      middleName: null,
    }

    const expectedResult = `${args.lastName} ${args.firstName}`
    expect(getFullUserName(args)).toBe(expectedResult)
  })
})
