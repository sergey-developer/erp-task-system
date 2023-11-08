import { screen } from '@testing-library/react'

import { RouteEnum } from 'configs/routes'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import CreateRelocationTaskPage from 'modules/warehouse/pages/CreateRelocationTaskPage'
import { testUtils as createRelocationTaskPageTestUtils } from 'modules/warehouse/pages/CreateRelocationTaskPage/CreateRelocationTaskPage.test'

import {
  mockGetCurrencyListSuccess,
  mockGetLocationListSuccess,
  mockGetRelocationTaskListSuccess,
  mockGetUserListSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeId,
  getStoreWithAuth,
  render,
  renderInRoute_latest,
} from '_tests_/utils'

import RelocationTaskListTab, { RelocationTaskListTabProps } from './index'

const props: RelocationTaskListTabProps = {
  taskId: fakeId(),
}

const getContainer = () => screen.getByTestId('relocation-task-list-tab')

const getCreateTaskButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Создать новое перемещение')

export const testUtils = {
  getContainer,

  getCreateTaskButton,
}

describe('Вкладка списка заявок на перемещение', () => {
  describe('Кнопка создания', () => {
    test('Отображается корректно', () => {
      mockGetRelocationTaskListSuccess()

      render(<RelocationTaskListTab {...props} />)

      const button = testUtils.getCreateTaskButton()
      expect(button).toBeInTheDocument()
    })

    test('Активна если есть права', () => {
      mockGetRelocationTaskListSuccess()

      render(<RelocationTaskListTab {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_CREATE'] }),
          },
        }),
      })

      const button = testUtils.getCreateTaskButton()
      expect(button).toBeEnabled()
    })

    test('Не активна если нет прав', () => {
      mockGetRelocationTaskListSuccess()

      render(<RelocationTaskListTab {...props} />)

      const button = testUtils.getCreateTaskButton()
      expect(button).toBeDisabled()
    })

    test('При клике перенаправляет на страницу создания заявки на перемещение', async () => {
      mockGetRelocationTaskListSuccess()
      mockGetUserListSuccess()
      mockGetCurrencyListSuccess()
      mockGetLocationListSuccess({ once: false })

      const { user } = renderInRoute_latest(
        [
          {
            path: RouteEnum.TaskList,
            element: <RelocationTaskListTab {...props} />,
          },
          {
            path: WarehouseRouteEnum.CreateRelocationTask,
            element: <CreateRelocationTaskPage />,
          },
        ],
        { initialEntries: [RouteEnum.TaskList], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: ['RELOCATION_TASKS_CREATE'] }),
            },
          }),
        },
      )

      const button = testUtils.getCreateTaskButton()
      await user.click(button)

      const page = createRelocationTaskPageTestUtils.getContainer()
      expect(page).toBeInTheDocument()
    })
  })
})
