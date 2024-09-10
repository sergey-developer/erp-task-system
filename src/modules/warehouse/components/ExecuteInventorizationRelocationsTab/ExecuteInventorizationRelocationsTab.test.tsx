import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import pick from 'lodash/pick'

import { CommonRouteEnum } from 'configs/routes'

import { testUtils as executeInventorizationRelocationTaskTableTestUtils } from 'modules/warehouse/components/ExecuteInventorizationRelocationTaskTable/ExecuteInventorizationRelocationTaskTable.test'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import CreateRelocationTaskDraftPage from 'modules/warehouse/pages/CreateRelocationTaskDraftPage'
import { testUtils as createRelocationTaskDraftPageTestUtils } from 'modules/warehouse/pages/CreateRelocationTaskDraftPage/CreateRelocationTaskDraftPage.test'

import commonFixtures from '_tests_/fixtures/common'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { mockGetRelocationTasksSuccess } from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  getStoreWithAuth,
  render,
  renderWithRouter,
  tableTestUtils,
} from '_tests_/utils'

import ExecuteInventorizationRelocationsTab, {
  ExecuteInventorizationRelocationsTabProps,
} from './index'

const props: ExecuteInventorizationRelocationsTabProps = {
  inventorization: pick(
    warehouseFixtures.inventorization(),
    'id',
    'executor',
    'status',
    'type',
    'deadlineAt',
    'createdAt',
    'createdBy',
    'warehouses',
  ),
}

const getContainer = () => screen.getByTestId('execute-inventorization-relocations-tab')

// create task button
const getCreateTaskButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Создать заявку')
const clickCreateTaskButton = async (user: UserEvent) => user.click(getCreateTaskButton())

export const testUtils = {
  getContainer,

  clickCreateTaskButton,
}

describe('Вкладка списка заявок на перемещение оборудования', () => {
  test('Отображает заголовок и таблицу с элементами и пагинацией', async () => {
    const relocationTasks = warehouseFixtures.relocationTasks()
    mockGetRelocationTasksSuccess({ body: commonFixtures.paginatedListResponse(relocationTasks) })

    render(<ExecuteInventorizationRelocationsTab {...props} />)

    const container = testUtils.getContainer()
    const title = within(container).getByText('Заявки на перемещение оборудования')
    await executeInventorizationRelocationTaskTableTestUtils.expectLoadingFinished()
    const table = executeInventorizationRelocationTaskTableTestUtils.getContainer()

    expect(title).toBeInTheDocument()
    expect(table).toBeInTheDocument()
    tableTestUtils.expectPaginationEnabledIn(table)
    tableTestUtils.expectRowsRendered(table, relocationTasks)
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

      await testUtils.clickCreateTaskButton(user)
      const page = createRelocationTaskDraftPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
