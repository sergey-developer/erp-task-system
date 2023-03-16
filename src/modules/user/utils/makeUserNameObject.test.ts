import { makeUserNameObject } from './makeUserNameObject'

describe('Корректно возвращает все поля', () => {
  test('Если данные присутствуют', () => {
    const fullName = 'lastName firstName middleName'
    const result = makeUserNameObject(fullName)

    expect(result.firstName).toBe('firstName')
    expect(result.lastName).toBe('lastName')
    expect(result.middleName).toBe('middleName')
  })

  test('Если данные отсутствуют', () => {
    const result = makeUserNameObject('')

    expect(result.firstName).toBe('')
    expect(result.lastName).toBe('')
    expect(result.middleName).toBe('')
  })
})
