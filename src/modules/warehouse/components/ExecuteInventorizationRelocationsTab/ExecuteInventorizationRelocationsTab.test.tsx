import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import pick from 'lodash/pick'

import { CommonRouteEnum } from 'configs/routes'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import CreateRelocationTaskDraftPage from 'modules/warehouse/pages/CreateRelocationTaskDraftPage'
import { testUtils as createRelocationTaskDraftPageTestUtils } from 'modules/warehouse/pages/CreateRelocationTaskDraftPage/CreateRelocationTaskDraftPage.test'

import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import { buttonTestUtils, getStoreWithAuth, render, renderWithRouter } from '_tests_/utils'

import ExecuteInventorizationRelocationsTab, {
  ExecuteInventorizationRelocationsTabProps,
} from './index'

const props: ExecuteInventorizationRelocationsTabProps = {
  inventorization: pick(warehouseFixtures.inventorization(), 'executor', 'status'),
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
  test('Отображает заголовок', () => {
    render(<ExecuteInventorizationRelocationsTab {...props} />)

    const container = testUtils.getContainer()
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

      await testUtils.clickCreateTaskButton(user)
      const page = createRelocationTaskDraftPageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })
})
