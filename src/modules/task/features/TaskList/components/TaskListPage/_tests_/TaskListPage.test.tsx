import { generateId, render } from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import { UserRolesEnum } from 'shared/constants/roles'

import TaskListPage from '../index'

describe('Страница реестра заявок', () => {
  describe('Для пользователя с ролью', () => {
    describe(`${UserRolesEnum.FirstLineSupport}`, () => {
      test('Отображает таблицу заявок', () => {
        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(<TaskListPage />, { store })
      })
    })
  })
})
