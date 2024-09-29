import { within } from '@testing-library/react'

import { CommonRouteEnum } from 'configs/routes'

import { testUtils as executeInventorizationRelocationTaskTableTestUtils } from 'modules/warehouse/components/ExecuteInventorizationRelocationTaskTable/ExecuteInventorizationRelocationTaskTable.test'
import { testUtils as relocationTaskDetailsTestUtils } from 'modules/warehouse/components/RelocationTaskDetails/RelocationTaskDetails.test'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import CreateRelocationTaskDraftPage from 'modules/warehouse/pages/CreateRelocationTaskDraftPage'

import { props } from '_tests_/features/warehouse/components/ExecuteInventorizationRelocationsTab/constants'
import { executeInventorizationRelocationsTabTestUtils } from '_tests_/features/warehouse/components/ExecuteInventorizationRelocationsTab/testUtils'
import { createRelocationTaskDraftPageTestUtils } from '_tests_/features/warehouse/pages/CreateRelocationTaskDraftPage/testUtils'
import commonFixtures from '_tests_/fixtures/common'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTasksSuccess,
  mockGetRelocationTaskSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { getStoreWithAuth, render, renderWithRouter } from '_tests_/utils'

import ExecuteInventorizationRelocationsTab from './index'

describe('Вкладка списка заявок на перемещение оборудования', () => {
  test('Отображает заголовок и таблицу с элементами и пагинацией', async () => {
    const relocationTasks = warehouseFixtures.relocationTasks()
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
    const relocationTaskListItem = warehouseFixtures.relocationTaskListItem()
    mockGetRelocationTasksSuccess({
      body: commonFixtures.paginatedListResponse([relocationTaskListItem]),
    })
    mockGetRelocationTaskSuccess({ relocationTaskId: relocationTaskListItem.id })
    mockGetRelocationEquipmentListSuccess({ relocationTaskId: relocationTaskListItem.id })
    const currentUser = userFixtures.user()

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
            path: CommonRouteEnum.Root,
            element: <ExecuteInventorizationRelocationsTab {...props} />,
          },
          {
            path: WarehouseRouteEnum.CreateRelocationTaskDraft,
            element: <CreateRelocationTaskDraftPage />,
          },
        ],
        { initialIndex: 0, initialEntries: [CommonRouteEnum.Root] },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      await executeInventorizationRelocationsTabTestUtils.clickCreateTaskButton(user)
      const page = createRelocationTaskDraftPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
