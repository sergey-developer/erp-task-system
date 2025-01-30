import { makeUserByFullName } from './makeUserByFullName'

describe('Корректно возвращает все поля', () => {
  test('Если данные присутствуют', () => {
    const fullName = 'lastName firstName middleName'
    const result = makeUserByFullName(fullName)

    expect(result.firstName).toBe('firstName')
    expect(result.lastName).toBe('lastName')
    expect(result.middleName).toBe('middleName')
  })

  test('Если данные отсутствуют', () => {
    const result = makeUserByFullName('')

    expect(result.firstName).toBe('')
    expect(result.lastName).toBe('')
    expect(result.middleName).toBe('')
  })
})
