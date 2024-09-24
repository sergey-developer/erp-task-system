import { within } from '@testing-library/react'

import { TasksRoutesEnum } from 'modules/task/constants/routes'
import { UserPermissionsEnum } from 'modules/user/constants'
import { getRelocationTasksErrMsg } from 'modules/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import CreateDocumentsPackagePage from 'modules/warehouse/pages/CreateDocumentsPackagePage'
import CreateRelocationTaskSimplifiedPage from 'modules/warehouse/pages/CreateRelocationTaskSimplifiedPage'
import RelocationTasksPage from 'modules/warehouse/pages/RelocationTasksPage'

import { relocationTasksTestUtils } from '_tests_/features/tasks/components/RelocationTasks/testUtils'
import { props } from '_tests_/features/tasks/components/TaskDetails/Tabs/RelocationTasksTab/constants'
import { relocationTasksTabTestUtils } from '_tests_/features/tasks/components/TaskDetails/Tabs/RelocationTasksTab/testUtils'
import { relocationTaskDetailsTestUtils } from '_tests_/features/warehouse/components/RelocationTaskDetails/testUtils'
import { createDocumentsPackagePageTestUtils } from '_tests_/features/warehouse/pages/CreateDocumentsPackagePage/testUtils'
import { createRelocationTaskSimplifiedPageTestUtils } from '_tests_/features/warehouse/pages/CreateRelocationTaskSimplifiedPage/testUtils'
import commonFixtures from '_tests_/fixtures/common'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetCurrencyListSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTasksForbiddenError,
  mockGetRelocationTasksServerError,
  mockGetRelocationTasksSuccess,
  mockGetRelocationTaskSuccess,
  mockGetUsersSuccess,
  mockGetWarehouseMSISuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  fakeId,
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  renderWithRouter,
  setupApiTests,
} from '_tests_/utils'

import RelocationTasksTab from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Вкладка списка заявок на перемещение', () => {
  test('Заголовок отображается со счётчиком', async () => {
    const relocationTasks = warehouseFixtures.relocationTasks()
    mockGetRelocationTasksSuccess({
      body: commonFixtures.paginatedListResponse(relocationTasks),
    })

    render(<RelocationTasksTab {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })

    await relocationTasksTabTestUtils.expectLoadingFinished()
    const title = within(relocationTasksTabTestUtils.getContainer()).getByText(
      `Перемещения (${relocationTasks.length})`,
    )

    expect(title).toBeInTheDocument()
  })

  describe('Кнопка создания', () => {
    test('Отображается', () => {
      mockGetRelocationTasksSuccess()

      render(<RelocationTasksTab {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = relocationTasksTabTestUtils.getCreateTaskButton()
      expect(button).toBeInTheDocument()
    })

    test('Активна если условия соблюдены', () => {
      mockGetRelocationTasksSuccess()

      render(<RelocationTasksTab {...props} />, {
        store: getStoreWithAuth({ id: props.task.assignee!.id }, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksCreate] }),
          },
        }),
      })

      const button = relocationTasksTabTestUtils.getCreateTaskButton()
      expect(button).toBeEnabled()
    })

    test('Не активна если условия соблюдены, но нет прав', () => {
      mockGetRelocationTasksSuccess()

      render(<RelocationTasksTab {...props} />, {
        store: getStoreWithAuth({ id: props.task.assignee!.id }, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = relocationTasksTabTestUtils.getCreateTaskButton()
      expect(button).toBeDisabled()
    })

    test('Не активна если условия соблюдены, но исполнитель заявки не авторизованный пользователь', () => {
      mockGetRelocationTasksSuccess()

      render(<RelocationTasksTab {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksCreate] }),
          },
        }),
      })

      const button = relocationTasksTabTestUtils.getCreateTaskButton()
      expect(button).toBeDisabled()
    })

    test('При клике переходит на страницу создания заявки на перемещение', async () => {
      mockGetRelocationTasksSuccess()
      mockGetUsersSuccess()
      mockGetCurrencyListSuccess()
      mockGetLocationsCatalogSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetWarehouseMSISuccess(fakeId())

      const { user } = renderWithRouter(
        [
          {
            path: TasksRoutesEnum.DesktopTasks,
            element: <RelocationTasksTab {...props} />,
          },
          {
            path: WarehouseRouteEnum.CreateRelocationTaskSimplified,
            element: <CreateRelocationTaskSimplifiedPage />,
          },
        ],
        { initialEntries: [TasksRoutesEnum.DesktopTasks], initialIndex: 0 },
        {
          store: getStoreWithAuth(props.task.assignee!, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksCreate] }),
            },
          }),
        },
      )

      const button = relocationTasksTabTestUtils.getCreateTaskButton()
      await user.click(button)

      const page = createRelocationTaskSimplifiedPageTestUtils.getContainer()
      expect(page).toBeInTheDocument()
    })
  })

  describe('Кнопка формирования пакета документов', () => {
    test('Отображается', () => {
      mockGetRelocationTasksSuccess()

      render(<RelocationTasksTab {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = relocationTasksTabTestUtils.getCreateDocumentsPackageButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике переходит на страницу формирования пакета документов', async () => {
      mockGetRelocationTasksSuccess()
      mockGetUsersSuccess()
      mockGetCurrencyListSuccess()
      mockGetLocationsCatalogSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetWarehouseMSISuccess(fakeId())

      const { user } = renderWithRouter(
        [
          {
            path: TasksRoutesEnum.DesktopTasks,
            element: <RelocationTasksTab {...props} />,
          },
          {
            path: WarehouseRouteEnum.CreateDocumentsPackage,
            element: <CreateDocumentsPackagePage />,
          },
        ],
        { initialEntries: [TasksRoutesEnum.DesktopTasks], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      const button = relocationTasksTabTestUtils.getCreateDocumentsPackageButton()
      await user.click(button)
      const page = await createDocumentsPackagePageTestUtils.getContainer()

      expect(page).toBeInTheDocument()
    })
  })

  describe('Список заявок', () => {
    test('При успешном запросе отображается корректно', async () => {
      const relocationTasks = warehouseFixtures.relocationTasks()
      mockGetRelocationTasksSuccess({
        body: commonFixtures.paginatedListResponse(relocationTasks),
      })

      render(<RelocationTasksTab {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await relocationTasksTabTestUtils.expectLoadingFinished()

      relocationTasks.forEach((item) => {
        const el = relocationTasksTestUtils.getListItem(item.id)
        expect(el).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 403', async () => {
        const errorMsg = fakeWord()
        mockGetRelocationTasksForbiddenError({ body: { detail: errorMsg } })

        render(<RelocationTasksTab {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await relocationTasksTabTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(errorMsg)

        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetRelocationTasksServerError()

        render(<RelocationTasksTab {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await relocationTasksTabTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(getRelocationTasksErrMsg)

        expect(notification).toBeInTheDocument()
      })
    })

    test('При клике на заявку переходит на страницу реестра заявок на перемещение и открывает её карточку', async () => {
      const relocationTaskListItem = warehouseFixtures.relocationTaskListItem()
      mockGetRelocationTasksSuccess({
        body: commonFixtures.paginatedListResponse([relocationTaskListItem]),
        once: false,
      })
      mockGetRelocationTaskSuccess(relocationTaskListItem.id)
      mockGetRelocationEquipmentListSuccess(relocationTaskListItem.id)

      const { user } = renderWithRouter(
        [
          {
            path: TasksRoutesEnum.DesktopTasks,
            element: <RelocationTasksTab {...props} />,
          },
          {
            path: WarehouseRouteEnum.RelocationTasks,
            element: <RelocationTasksPage />,
          },
        ],
        { initialEntries: [TasksRoutesEnum.DesktopTasks], initialIndex: 0 },
        {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      await relocationTasksTabTestUtils.expectLoadingFinished()
      await relocationTasksTestUtils.clickListItem(user, relocationTaskListItem.id)
      const card = await relocationTaskDetailsTestUtils.findContainer()

      expect(card).toBeInTheDocument()
    })
  })
})
