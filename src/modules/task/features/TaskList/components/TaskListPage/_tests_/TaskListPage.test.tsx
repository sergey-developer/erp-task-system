import {
  generateId,
  render,
  setupApiTests,
  waitStartLoadingByIcon,
} from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import {
  mockGetTaskCountersSuccess,
  mockGetTaskListSuccess,
} from 'modules/task/features/TaskList/_tests_/mocks'
import { UserRolesEnum } from 'shared/constants/roles'

import { FastFilterEnum } from '../../../constants/common'
import {
  getFilterContainer,
  getFilterTagByTextIn,
  getFirstFilterTagContainer,
  waitFinishLoading as waitFinishFilterLoading,
  waitStartLoading as waitStartFilterLoading,
} from '../../FastFilter/_tests_/utils'
import { fastFilterNamesDict } from '../../FastFilter/constants'
import { getTable as getTaskTable } from '../../TaskTable/_tests_/utils'
import TaskListPage from '../index'

setupApiTests()

describe('Страница реестра заявок', () => {
  describe('Таблица заявок', () => {
    test('Отображается', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()

      const store = getStoreWithAuth({
        userId: generateId(),
        userRole: UserRolesEnum.FirstLineSupport,
      })

      render(<TaskListPage />, { store })

      const taskTable = getTaskTable()
      expect(taskTable).toBeInTheDocument()
    })
  })

  describe('Быстрый фильтр', () => {
    test('Отображается', async () => {
      mockGetTaskListSuccess()
      mockGetTaskCountersSuccess()

      const store = getStoreWithAuth({
        userId: generateId(),
        userRole: UserRolesEnum.FirstLineSupport,
      })

      render(<TaskListPage />, { store })

      const fastFilter = getFilterContainer()
      expect(fastFilter).toBeInTheDocument()
    })

    test('При смене фильтра заявки запрашиваются снова', async () => {
      mockGetTaskListSuccess(undefined, { once: false })
      mockGetTaskCountersSuccess()

      const store = getStoreWithAuth({
        userId: generateId(),
        userRole: UserRolesEnum.FirstLineSupport,
      })

      const { user } = render(<TaskListPage />, { store })

      const filterTagContainer = getFirstFilterTagContainer()
      await waitStartFilterLoading(filterTagContainer)
      await waitFinishFilterLoading(filterTagContainer)

      const filterTag = getFilterTagByTextIn(
        getFilterContainer(),
        fastFilterNamesDict[FastFilterEnum.Free],
      )

      await user.click(filterTag)

      const taskTable = getTaskTable()
      await waitStartLoadingByIcon(taskTable)
    })

    test('Сбрасывается если применён "Расширенный фильтр"', () => {})
  })
})
