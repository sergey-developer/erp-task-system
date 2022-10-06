import { getTaskListItem } from '_fixtures_/task'
import { generateId, render, setupApiTests } from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import { mockGetTaskListSuccess } from 'modules/task/features/TaskList/_tests_/mocks'
import { UserRolesEnum } from 'shared/constants/roles'

import TaskListPage from '../index'

setupApiTests()

describe('Страница реестра заявок', () => {
  describe('Для пользователя с ролью', () => {
    describe(`${UserRolesEnum.FirstLineSupport}`, () => {
      test('Отображает таблицу заявок', () => {
        mockGetTaskListSuccess([getTaskListItem()])

        const store = getStoreWithAuth({
          userId: generateId(),
          userRole: UserRolesEnum.FirstLineSupport,
        })

        render(<TaskListPage />, { store })
      })
    })
  })
})
