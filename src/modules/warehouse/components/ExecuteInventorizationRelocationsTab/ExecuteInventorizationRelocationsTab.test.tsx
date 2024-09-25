import { within } from '@testing-library/react'

import { CommonRouteEnum } from 'configs/routes'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import CreateRelocationTaskDraftPage from 'modules/warehouse/pages/CreateRelocationTaskDraftPage'

import { props } from '_tests_/features/warehouse/components/ExecuteInventorizationRelocationsTab/constants'
import { executeInventorizationRelocationsTabTestUtils } from '_tests_/features/warehouse/components/ExecuteInventorizationRelocationsTab/testUtils'
import { createRelocationTaskDraftPageTestUtils } from '_tests_/features/warehouse/pages/CreateRelocationTaskDraftPage/testUtils'
import userFixtures from '_tests_/fixtures/user'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { getStoreWithAuth, render, renderWithRouter } from '_tests_/utils'

import ExecuteInventorizationRelocationsTab from './index'

describe('Вкладка списка заявок на перемещение оборудования', () => {
  test('Отображает заголовок', () => {
    render(<ExecuteInventorizationRelocationsTab {...props} />)

    const container = executeInventorizationRelocationsTabTestUtils.getContainer()
    const title = within(container).getByText('Заявки на перемещение оборудования')

    expect(title).toBeInTheDocument()
  })

  describe('Кнопка создания заявки', () => {
    test('При клике переходит на страницу создания черновика заявки на перемещение оборудования', async () => {
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
