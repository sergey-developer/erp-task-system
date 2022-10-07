import {
  generateId,
  render,
  setupApiTests,
  waitFinishLoadingByIcon,
} from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import {
  mockGetTaskCountersSuccess,
  mockGetTaskListSuccess,
} from 'modules/task/features/TaskList/_tests_/mocks'
import { UserRolesEnum } from 'shared/constants/roles'

import {
  getAllFilterTagContainer,
  getFilterContainer,
  waitFinishLoading,
} from '../../FastFilter/_tests_/utils'
import { getTable as getTaskTable } from '../../TaskTable/_tests_/utils'
import TaskListPage from '../index'

setupApiTests()

describe('Страница реестра заявок', () => {
  describe('Таблица заявок', () => {
    test('Отображается для пользователя с допустимой ролью', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()

      const store = getStoreWithAuth({
        userId: generateId(),
        userRole: UserRolesEnum.FirstLineSupport,
      })

      render(<TaskListPage />, { store })

      await waitFinishLoadingByIcon()

      const taskTable = getTaskTable()
      expect(taskTable).toBeInTheDocument()
    })
  })

  describe('Быстрый фильтр', () => {
    test('Отображается для пользователя с допустимой ролью', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()

      const store = getStoreWithAuth({
        userId: generateId(),
        userRole: UserRolesEnum.FirstLineSupport,
      })

      render(<TaskListPage />, { store })

      const filterTagContainer = getAllFilterTagContainer()[0]
      await waitFinishLoading(filterTagContainer)

      const fastFilter = getFilterContainer()
      expect(fastFilter).toBeInTheDocument()
    })
  })
})
