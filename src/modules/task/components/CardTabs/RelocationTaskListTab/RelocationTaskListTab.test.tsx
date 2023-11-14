import { screen, within } from '@testing-library/react'

import { CommonRouteEnum } from 'configs/routes'

import { testUtils as relocationTaskListTestUtils } from 'modules/task/components/RelocationTaskList/RelocationTaskList.test'
import { testUtils as relocationTaskDetailsTestUtils } from 'modules/warehouse/components/RelocationTaskDetails/RelocationTaskDetails.test'
import { getRelocationTaskListErrorMsg } from 'modules/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import CreateRelocationTaskPage from 'modules/warehouse/pages/CreateRelocationTaskPage'
import { testUtils as createRelocationTaskPageTestUtils } from 'modules/warehouse/pages/CreateRelocationTaskPage/CreateRelocationTaskPage.test'
import RelocationTaskListPage from 'modules/warehouse/pages/RelocationTaskListPage'

import commonFixtures from '_tests_/fixtures/common'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetCurrencyListSuccess,
  mockGetLocationListSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskListForbiddenError,
  mockGetRelocationTaskListServerError,
  mockGetRelocationTaskListSuccess,
  mockGetRelocationTaskSuccess,
  mockGetUserListSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeId,
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  renderInRoute_latest,
  setupApiTests,
  spinnerTestUtils,
} from '_tests_/utils'

import RelocationTaskListTab, { RelocationTaskListTabProps } from './index'

const props: RelocationTaskListTabProps = {
  taskId: fakeId(),
}

const getContainer = () => screen.getByTestId('relocation-task-list-tab')

// create task button
const getCreateTaskButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Создать новое перемещение')

export const testUtils = {
  getContainer,
  expectLoadingFinished: spinnerTestUtils.expectLoadingFinished('relocation-task-list-loading'),

  getCreateTaskButton,
}

setupApiTests()

describe('Вкладка списка заявок на перемещение', () => {
  test('Заголовок отображается со счётчиком', async () => {
    const relocationTaskList = warehouseFixtures.relocationTaskList()
    mockGetRelocationTaskListSuccess({
      body: commonFixtures.paginatedListResponse(relocationTaskList),
    })

    render(<RelocationTaskListTab {...props} />)

    await testUtils.expectLoadingFinished()
    const title = within(getContainer()).getByText(`Перемещения (${relocationTaskList.length})`)

    expect(title).toBeInTheDocument()
  })

  describe('Кнопка создания', () => {
    test('Отображается', () => {
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

    test('При клике переходит на страницу создания заявки на перемещение', async () => {
      mockGetRelocationTaskListSuccess()
      mockGetUserListSuccess()
      mockGetCurrencyListSuccess()
      mockGetLocationListSuccess({ once: false })

      const { user } = renderInRoute_latest(
        [
          {
            path: CommonRouteEnum.DesktopTaskList,
            element: <RelocationTaskListTab {...props} />,
          },
          {
            path: WarehouseRouteEnum.CreateRelocationTask,
            element: <CreateRelocationTaskPage />,
          },
        ],
        { initialEntries: [CommonRouteEnum.DesktopTaskList], initialIndex: 0 },
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

  describe('Список заявок', () => {
    test('При успешном запросе отображается корректно', async () => {
      const relocationTaskList = warehouseFixtures.relocationTaskList()
      mockGetRelocationTaskListSuccess({
        body: commonFixtures.paginatedListResponse(relocationTaskList),
      })

      render(<RelocationTaskListTab {...props} />)

      await testUtils.expectLoadingFinished()

      relocationTaskList.forEach((item) => {
        const el = relocationTaskListTestUtils.getListItem(item.id)
        expect(el).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 403', async () => {
        const errorMsg = fakeWord()
        mockGetRelocationTaskListForbiddenError({ body: { detail: errorMsg } })

        render(<RelocationTaskListTab {...props} />)

        await testUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(errorMsg)

        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetRelocationTaskListServerError()

        render(<RelocationTaskListTab {...props} />)

        await testUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(
          getRelocationTaskListErrorMsg,
        )

        expect(notification).toBeInTheDocument()
      })
    })

    test('При клике на заявку переходит на страницу реестра заявок на перемещение и открывает её карточку', async () => {
      const relocationTaskListItem = warehouseFixtures.relocationTaskListItem()
      mockGetRelocationTaskListSuccess({
        body: commonFixtures.paginatedListResponse([relocationTaskListItem]),
        once: false,
      })
      mockGetRelocationTaskSuccess(relocationTaskListItem.id)
      mockGetRelocationEquipmentListSuccess(relocationTaskListItem.id)

      const { user } = renderInRoute_latest(
        [
          {
            path: CommonRouteEnum.DesktopTaskList,
            element: <RelocationTaskListTab {...props} />,
          },
          {
            path: WarehouseRouteEnum.RelocationTaskList,
            element: <RelocationTaskListPage />,
          },
        ],
        { initialEntries: [CommonRouteEnum.DesktopTaskList], initialIndex: 0 },
      )

      await testUtils.expectLoadingFinished()
      await relocationTaskListTestUtils.clickListItem(user, relocationTaskListItem.id)
      const card = await relocationTaskDetailsTestUtils.findContainer()

      expect(card).toBeInTheDocument()
    })
  })
})
