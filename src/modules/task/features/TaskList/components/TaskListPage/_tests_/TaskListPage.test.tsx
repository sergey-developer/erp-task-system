import {
  mockGetTaskCountersSuccess,
  mockGetTaskListSuccess,
} from '_tests_/mocks/api'
import { generateId, render, setupApiTests } from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import { UserRolesEnum } from 'shared/constants/roles'

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

  // describe('Быстрый фильтр', () => {
  //   test('Отображается', async () => {
  //     mockGetTaskListSuccess()
  //     mockGetTaskCountersSuccess()
  //
  //     const store = getStoreWithAuth({
  //       userId: generateId(),
  //       userRole: UserRolesEnum.FirstLineSupport,
  //     })
  //
  //     render(<TaskListPage />, { store })
  //
  //     const fastFilter = getFilterContainer()
  //     expect(fastFilter).toBeInTheDocument()
  //   })
  //
  //   test('При смене фильтра заявки запрашиваются снова', async () => {
  //     mockGetTaskListSuccess()
  //     mockGetTaskCountersSuccess()
  //
  //     const store = getStoreWithAuth({
  //       userId: generateId(),
  //       userRole: UserRolesEnum.FirstLineSupport,
  //     })
  //
  //     const { user } = render(<TaskListPage />, { store })
  //
  //     const filterTagContainer = getFirstFilterTagContainer()
  //     await waitStartFilterLoading(filterTagContainer)
  //     await waitFinishFilterLoading(filterTagContainer)
  //
  //     const filterTag = getFilterTagByTextIn(
  //       getFilterContainer(),
  //       fastFilterNamesDict[FastFilterEnum.Free],
  //     )
  //
  //     await user.click(filterTag)
  //
  //     const taskTable = getTaskTable()
  //     await loadingStartedByIcon(taskTable)
  //   })
  //
  //   test('Сбрасывается если применён "Расширенный фильтр"', () => {})
  // })
})
