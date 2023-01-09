import { generateWord } from '_tests_/utils'
import { FunctionParams } from 'shared/interfaces/utils'

import { getFullUserName } from './getFullUserName'

describe('Возвращает корректное значение', () => {
  test('Если все данные переданы', () => {
    const args: FunctionParams<typeof getFullUserName> = {
      firstName: generateWord(),
      lastName: generateWord(),
      middleName: generateWord(),
    }

    const expectedResult = `${args.lastName} ${args.firstName} ${args.middleName}`
    expect(getFullUserName(args)).toBe(expectedResult)
  })

  test('Если middleName не передан', () => {
    const args: FunctionParams<typeof getFullUserName> = {
      firstName: generateWord(),
      lastName: generateWord(),
    }

    const expectedResult = `${args.lastName} ${args.firstName}`
    expect(getFullUserName(args)).toBe(expectedResult)
  })
})
