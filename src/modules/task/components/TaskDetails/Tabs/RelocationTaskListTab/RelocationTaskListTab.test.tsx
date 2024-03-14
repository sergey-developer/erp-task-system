import { screen, within } from '@testing-library/react'

import { testUtils as relocationTaskListTestUtils } from 'modules/task/components/RelocationTaskList/RelocationTaskList.test'
import { TasksRoutesEnum } from 'modules/task/constants/routes'
import { UserPermissionsEnum } from 'modules/user/constants'
import { testUtils as relocationTaskDetailsTestUtils } from 'modules/warehouse/components/RelocationTaskDetails/RelocationTaskDetails.test'
import { getRelocationTaskListErrorMsg } from 'modules/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import CreateRelocationTaskSimplifiedPage from 'modules/warehouse/pages/CreateRelocationTaskSimplifiedPage'
import { testUtils as createRelocationTaskSimplifiedPageTestUtils } from 'modules/warehouse/pages/CreateRelocationTaskSimplifiedPage/CreateRelocationTaskSimplifiedPage.test'
import RelocationTaskListPage from 'modules/warehouse/pages/RelocationTaskListPage'

import commonFixtures from '_tests_/fixtures/common'
import taskFixtures from '_tests_/fixtures/task'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetCurrencyListSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetLocationListSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTaskListForbiddenError,
  mockGetRelocationTaskListServerError,
  mockGetRelocationTaskListSuccess,
  mockGetRelocationTaskSuccess,
  mockGetUserListSuccess,
  mockGetWarehouseMSISuccess,
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

import RelocationTaskListTab from './index'
import { RelocationTaskListTabProps } from './types'

const props: RelocationTaskListTabProps = {
  task: taskFixtures.task(),
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
notificationTestUtils.setupNotifications()

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

    test('Активна если условия соблюдены', () => {
      mockGetRelocationTaskListSuccess()

      render(<RelocationTaskListTab {...props} />, {
        store: getStoreWithAuth({ userId: props.task.assignee!.id }, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksCreate] }),
          },
        }),
      })

      const button = testUtils.getCreateTaskButton()
      expect(button).toBeEnabled()
    })

    test('Не активна если условия соблюдены, но нет прав', () => {
      mockGetRelocationTaskListSuccess()

      render(<RelocationTaskListTab {...props} />, {
        store: getStoreWithAuth({ userId: props.task.assignee!.id }),
      })

      const button = testUtils.getCreateTaskButton()
      expect(button).toBeDisabled()
    })

    test('Не активна если условия соблюдены, но исполнитель заявки не авторизованный пользователь', () => {
      mockGetRelocationTaskListSuccess()

      render(<RelocationTaskListTab {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksCreate] }),
          },
        }),
      })

      const button = testUtils.getCreateTaskButton()
      expect(button).toBeDisabled()
    })

    test('При клике переходит на страницу создания заявки на перемещение', async () => {
      mockGetRelocationTaskListSuccess()
      mockGetUserListSuccess()
      mockGetCurrencyListSuccess()
      mockGetLocationListSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetWarehouseMSISuccess(fakeId())

      const { user } = renderInRoute_latest(
        [
          {
            path: TasksRoutesEnum.DesktopTaskList,
            element: <RelocationTaskListTab {...props} />,
          },
          {
            path: WarehouseRouteEnum.CreateRelocationTaskSimplified,
            element: <CreateRelocationTaskSimplifiedPage />,
          },
        ],
        { initialEntries: [TasksRoutesEnum.DesktopTaskList], initialIndex: 0 },
        {
          store: getStoreWithAuth({ userId: props.task.assignee!.id }, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksCreate] }),
            },
          }),
        },
      )

      const button = testUtils.getCreateTaskButton()
      await user.click(button)

      const page = createRelocationTaskSimplifiedPageTestUtils.getContainer()
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
            path: TasksRoutesEnum.DesktopTaskList,
            element: <RelocationTaskListTab {...props} />,
          },
          {
            path: WarehouseRouteEnum.RelocationTasks,
            element: <RelocationTaskListPage />,
          },
        ],
        { initialEntries: [TasksRoutesEnum.DesktopTaskList], initialIndex: 0 },
      )

      await testUtils.expectLoadingFinished()
      await relocationTaskListTestUtils.clickListItem(user, relocationTaskListItem.id)
      const card = await relocationTaskDetailsTestUtils.findContainer()

      expect(card).toBeInTheDocument()
    })
  })
})
