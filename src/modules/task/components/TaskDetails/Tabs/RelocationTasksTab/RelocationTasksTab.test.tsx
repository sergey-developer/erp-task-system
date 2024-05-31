import { screen, within } from '@testing-library/react'

import { testUtils as relocationTasksTestUtils } from 'modules/task/components/RelocationTasks/RelocationTasks.test'
import { TasksRoutesEnum } from 'modules/task/constants/routes'
import { UserPermissionsEnum } from 'modules/user/constants'
import { testUtils as relocationTaskDetailsTestUtils } from 'modules/warehouse/components/RelocationTaskDetails/RelocationTaskDetails.test'
import { getRelocationTasksErrorMsg } from 'modules/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import CreateDocumentsPackagePage from 'modules/warehouse/pages/CreateDocumentsPackagePage'
import { testUtils as createDocumentsPackagePageTestUtils } from 'modules/warehouse/pages/CreateDocumentsPackagePage/CreateDocumentsPackagePage.test'
import CreateRelocationTaskSimplifiedPage from 'modules/warehouse/pages/CreateRelocationTaskSimplifiedPage'
import { testUtils as createRelocationTaskSimplifiedPageTestUtils } from 'modules/warehouse/pages/CreateRelocationTaskSimplifiedPage/CreateRelocationTaskSimplifiedPage.test'
import RelocationTasksPage from 'modules/warehouse/pages/RelocationTasksPage'

import commonFixtures from '_tests_/fixtures/common'
import taskFixtures from '_tests_/fixtures/task'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetCurrencyListSuccess,
  mockGetEquipmentCatalogListSuccess,
  mockGetLocationListSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTasksForbiddenError,
  mockGetRelocationTasksServerError,
  mockGetRelocationTasksSuccess,
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

import RelocationTasksTab from './index'
import { RelocationTasksTabProps } from './types'

const props: RelocationTasksTabProps = {
  task: taskFixtures.task(),
}

const getContainer = () => screen.getByTestId('relocation-tasks-tab')

// create task button
const getCreateTaskButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Создать новое перемещение')

// create documents package button
const getCreateDocumentsPackageButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Сформировать пакет документов')

export const testUtils = {
  getContainer,
  expectLoadingFinished: spinnerTestUtils.expectLoadingFinished('relocation-tasks-loading'),

  getCreateTaskButton,
  getCreateDocumentsPackageButton,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Вкладка списка заявок на перемещение', () => {
  test('Заголовок отображается со счётчиком', async () => {
    const relocationTasks = warehouseFixtures.relocationTasks()
    mockGetRelocationTasksSuccess({
      body: commonFixtures.paginatedListResponse(relocationTasks),
    })

    render(<RelocationTasksTab {...props} />)

    await testUtils.expectLoadingFinished()
    const title = within(getContainer()).getByText(`Перемещения (${relocationTasks.length})`)

    expect(title).toBeInTheDocument()
  })

  describe('Кнопка создания', () => {
    test('Отображается', () => {
      mockGetRelocationTasksSuccess()

      render(<RelocationTasksTab {...props} />)

      const button = testUtils.getCreateTaskButton()
      expect(button).toBeInTheDocument()
    })

    test('Активна если условия соблюдены', () => {
      mockGetRelocationTasksSuccess()

      render(<RelocationTasksTab {...props} />, {
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
      mockGetRelocationTasksSuccess()

      render(<RelocationTasksTab {...props} />, {
        store: getStoreWithAuth({ userId: props.task.assignee!.id }),
      })

      const button = testUtils.getCreateTaskButton()
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

      const button = testUtils.getCreateTaskButton()
      expect(button).toBeDisabled()
    })

    test('При клике переходит на страницу создания заявки на перемещение', async () => {
      mockGetRelocationTasksSuccess()
      mockGetUserListSuccess()
      mockGetCurrencyListSuccess()
      mockGetLocationListSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetWarehouseMSISuccess(fakeId())

      const { user } = renderInRoute_latest(
        [
          {
            path: TasksRoutesEnum.DesktopTaskList,
            element: <RelocationTasksTab {...props} />,
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

  describe('Кнопка формирования пакета документов', () => {
    test('Отображается', () => {
      mockGetRelocationTasksSuccess()

      render(<RelocationTasksTab {...props} />)

      const button = testUtils.getCreateDocumentsPackageButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике переходит на страницу формирования пакета документов', async () => {
      mockGetRelocationTasksSuccess()
      mockGetUserListSuccess()
      mockGetCurrencyListSuccess()
      mockGetLocationListSuccess({ once: false })
      mockGetEquipmentCatalogListSuccess()
      mockGetWarehouseMSISuccess(fakeId())

      const { user } = renderInRoute_latest(
        [
          {
            path: TasksRoutesEnum.DesktopTaskList,
            element: <RelocationTasksTab {...props} />,
          },
          {
            path: WarehouseRouteEnum.CreateDocumentsPackage,
            element: <CreateDocumentsPackagePage />,
          },
        ],
        { initialEntries: [TasksRoutesEnum.DesktopTaskList], initialIndex: 0 },
      )

      const button = testUtils.getCreateDocumentsPackageButton()
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

      render(<RelocationTasksTab {...props} />)

      await testUtils.expectLoadingFinished()

      relocationTasks.forEach((item) => {
        const el = relocationTasksTestUtils.getListItem(item.id)
        expect(el).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 403', async () => {
        const errorMsg = fakeWord()
        mockGetRelocationTasksForbiddenError({ body: { detail: errorMsg } })

        render(<RelocationTasksTab {...props} />)

        await testUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(errorMsg)

        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetRelocationTasksServerError()

        render(<RelocationTasksTab {...props} />)

        await testUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(
          getRelocationTasksErrorMsg,
        )

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

      const { user } = renderInRoute_latest(
        [
          {
            path: TasksRoutesEnum.DesktopTaskList,
            element: <RelocationTasksTab {...props} />,
          },
          {
            path: WarehouseRouteEnum.RelocationTasks,
            element: <RelocationTasksPage />,
          },
        ],
        { initialEntries: [TasksRoutesEnum.DesktopTaskList], initialIndex: 0 },
      )

      await testUtils.expectLoadingFinished()
      await relocationTasksTestUtils.clickListItem(user, relocationTaskListItem.id)
      const card = await relocationTaskDetailsTestUtils.findContainer()

      expect(card).toBeInTheDocument()
    })
  })
})
