import { waitFor, within } from '@testing-library/react'
import { testUtils as executeInventorizationRelocationTaskTableTestUtils } from 'features/inventorizations/components/ExecuteInventorizationRelocationTaskTable/ExecuteInventorizationRelocationTaskTable.test'
import CreateRelocationTaskDraftPage from 'features/relocationTasks/pages/CreateRelocationTaskDraftPage'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'

import { CommonRoutesEnum } from 'configs/routes'

import { props } from '_tests_/features/warehouses/components/ExecuteInventorizationRelocationsTab/constants'
import { executeInventorizationRelocationsTabTestUtils } from '_tests_/features/warehouses/components/ExecuteInventorizationRelocationsTab/testUtils'
import { relocationTaskDetailsTestUtils } from '_tests_/features/warehouses/components/RelocationTaskDetails/testUtils'
import { createRelocationTaskDraftPageTestUtils } from '_tests_/features/warehouses/pages/CreateRelocationTaskDraftPage/testUtils'
import commonFixtures from '_tests_/fixtures/common'
import relocationTasksFixtures from '_tests_/fixtures/relocationTasks'
import userFixtures from '_tests_/fixtures/users'
import { getStoreWithAuth, render, renderWithRouter, tableTestUtils } from '_tests_/helpers'
import {
  mockGetRelocationEquipmentsSuccess,
  mockGetRelocationTasksSuccess,
  mockGetRelocationTaskSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/store/users'

import ExecuteInventorizationRelocationsTab from './index'

describe('Вкладка списка заявок на перемещение оборудования', () => {
  test('Отображает заголовок и таблицу с элементами и пагинацией', async () => {
    const relocationTasks = relocationTasksFixtures.relocationTasks()
    mockGetRelocationTasksSuccess({ body: commonFixtures.paginatedListResponse(relocationTasks) })

    render(<ExecuteInventorizationRelocationsTab {...props} />)

    const container = executeInventorizationRelocationsTabTestUtils.getContainer()
    const title = within(container).getByText('Заявки на перемещение оборудования')
    await executeInventorizationRelocationTaskTableTestUtils.expectLoadingFinished()
    const table = executeInventorizationRelocationTaskTableTestUtils.getContainer()

    expect(title).toBeInTheDocument()
    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)
    tableTestUtils.expectRowsRendered(table, relocationTasks)
  })

  test('Можно открыть и закрыть карточку заявки', async () => {
    const relocationTaskListItem = relocationTasksFixtures.relocationTask()
    mockGetRelocationTasksSuccess({
      body: commonFixtures.paginatedListResponse([relocationTaskListItem]),
    })
    mockGetRelocationTaskSuccess({ relocationTaskId: relocationTaskListItem.id })
    mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTaskListItem.id })
    const currentUser = userFixtures.userDetail()

    const { user } = render(<ExecuteInventorizationRelocationsTab {...props} />, {
      store: getStoreWithAuth(currentUser, undefined, undefined, {
        queries: { ...getUserMeQueryMock(currentUser) },
      }),
    })
    await executeInventorizationRelocationTaskTableTestUtils.expectLoadingFinished()

    await executeInventorizationRelocationTaskTableTestUtils.clickRow(
      user,
      relocationTaskListItem.id,
    )
    const taskDetails = await relocationTaskDetailsTestUtils.findContainer()
    expect(taskDetails).toBeInTheDocument()
    await relocationTaskDetailsTestUtils.clickCloseButton(user)
    await waitFor(() => expect(taskDetails).not.toBeInTheDocument())
  })

  describe('Кнопка создания заявки', () => {
    test('При клике переходит на страницу создания черновика заявки на перемещение оборудования', async () => {
      mockGetRelocationTasksSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: CommonRoutesEnum.Root,
            element: <ExecuteInventorizationRelocationsTab {...props} />,
          },
          {
            path: WarehousesRoutesEnum.CreateRelocationTaskDraft,
            element: <CreateRelocationTaskDraftPage />,
          },
        ],
        { initialIndex: 0, initialEntries: [CommonRoutesEnum.Root] },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        },
      )

      await executeInventorizationRelocationsTabTestUtils.clickCreateTaskButton(user)
      const page = createRelocationTaskDraftPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
