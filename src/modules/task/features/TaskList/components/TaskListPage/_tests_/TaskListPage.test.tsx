import {
  mockGetTaskCountersSuccess,
  mockGetTaskListSuccess,
  mockGetTaskSuccess,
  mockGetWorkGroupListSuccess,
} from '_tests_/mocks/api'
import { loadingFinishedByIconIn, render, setupApiTests } from '_tests_/utils'
import { getStoreWithAuth } from '_tests_/utils/auth'
import { waitFor } from '@testing-library/react'
import { getGetTaskListResponse, getTaskListItem } from 'fixtures/task'

import { findTaskDetails } from '../../../../TaskView/components/TaskDetails/_tests_/utils'
import {
  getTable as getTaskTable,
  userClickFirstRow as userClickFirstTableRow,
} from '../../TaskTable/_tests_/utils'
import TaskListPage from '../index'

setupApiTests()

describe('Страница реестра заявок', () => {
  describe('Таблица заявок', () => {
    test('Отображается', async () => {
      mockGetTaskCountersSuccess()
      mockGetTaskListSuccess()

      render(<TaskListPage />, { store: getStoreWithAuth() })

      const taskTable = getTaskTable()
      await loadingFinishedByIconIn(taskTable)

      expect(taskTable).toBeInTheDocument()
    })

    describe('При клике на строку', () => {
      test('Добавляется нужный класс для её выделения', async () => {
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()

        const taskListItem = getTaskListItem()
        mockGetTaskListSuccess(getGetTaskListResponse([taskListItem]))
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        const taskTable = getTaskTable()
        await loadingFinishedByIconIn(taskTable)

        const row = await userClickFirstTableRow(user)

        await waitFor(() => {
          expect(row).toHaveClass('table-row--selected')
        })
      })

      test('Открывается карточка заявки', async () => {
        mockGetTaskCountersSuccess()
        mockGetWorkGroupListSuccess()

        const taskListItem = getTaskListItem()
        mockGetTaskListSuccess(getGetTaskListResponse([taskListItem]))
        mockGetTaskSuccess(taskListItem.id)

        const { user } = render(<TaskListPage />, { store: getStoreWithAuth() })

        const taskTable = getTaskTable()
        await loadingFinishedByIconIn(taskTable)

        await userClickFirstTableRow(user)

        const taskDetails = await findTaskDetails()
        expect(taskDetails).toBeInTheDocument()
      })
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
  //     await loadingStartedByIconIn(taskTable)
  //   })
  //
  //   test('Сбрасывается если применён "Расширенный фильтр"', () => {})
  // })
})
