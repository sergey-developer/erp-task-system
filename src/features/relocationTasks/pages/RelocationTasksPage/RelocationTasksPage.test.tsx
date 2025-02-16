import { waitFor } from '@testing-library/react'
import {
  getRelocationTasksErrorMessage,
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'features/relocationTasks/api/constants'
import {
  relocationTaskStatusDict,
  relocationTaskTypeDict,
} from 'features/relocationTasks/constants'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'

import { ariaSortAttrAscValue, ariaSortAttrName } from '_tests_/constants/components'
import { relocationTaskDetailsTestUtils } from '_tests_/features/warehouses/components/RelocationTaskDetails/testUtils'
import { relocationTaskTableTestUtils } from '_tests_/features/warehouses/components/RelocationTaskTable/testUtils'
import { relocationTasksFilterTestUtils } from '_tests_/features/warehouses/components/RelocationTasksFilter/testUtils'
import { createRelocationTaskPageTestUtils } from '_tests_/features/warehouses/pages/CreateRelocationTaskPage/testUtils'
import { relocationTasksPageTestUtils } from '_tests_/features/warehouses/pages/RelocationTasksPage/testUtils'
import commonFixtures from '_tests_/fixtures/common'
import userFixtures from '_tests_/fixtures/users'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  fakeWord,
  getStoreWithAuth,
  notificationTestUtils,
  render,
  renderWithRouter,
  selectTestUtils,
  setupApiTests,
  tableTestUtils,
} from '_tests_/helpers'
import {
  mockGetCurrenciesSuccess,
  mockGetLocationsCatalogSuccess,
  mockGetRelocationEquipmentsSuccess,
  mockGetRelocationTasksForbiddenError,
  mockGetRelocationTasksServerError,
  mockGetRelocationTasksSuccess,
  mockGetRelocationTaskSuccess,
  mockGetUsersSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/store/users'

import CreateRelocationTaskPage from '../CreateRelocationTaskPage'
import RelocationTasksPage from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница списка заявок на перемещение оборудования', () => {
  describe.skip('Список заявок на перемещение оборудования', () => {
    test('При успешном запросе отображается корректно', async () => {
      const relocationTasks = warehouseFixtures.relocationTasks()
      mockGetRelocationTasksSuccess({
        body: commonFixtures.paginatedListResponse(relocationTasks),
      })

      render(<RelocationTasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskTableTestUtils.expectLoadingFinished()

      relocationTasks.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 403', async () => {
        const errorMessage = fakeWord()
        mockGetRelocationTasksForbiddenError({ body: { detail: errorMessage } })

        render(<RelocationTasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await relocationTaskTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(errorMessage)

        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetRelocationTasksServerError()

        render(<RelocationTasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await relocationTaskTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(
          getRelocationTasksErrorMessage,
        )

        expect(notification).toBeInTheDocument()
      })
    })

    test('Пагинация работает', async () => {
      const relocationTasks = warehouseFixtures.relocationTasks(11)
      mockGetRelocationTasksSuccess({
        body: commonFixtures.paginatedListResponse(relocationTasks),
        once: false,
      })

      const { user } = render(<RelocationTasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const table = await relocationTaskTableTestUtils.expectLoadingFinished()
      await tableTestUtils.clickPaginationNextButtonIn(user, table)
      await relocationTaskTableTestUtils.expectLoadingStarted()
      await relocationTaskTableTestUtils.expectLoadingFinished()

      relocationTasks.slice(-1).forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    test('Установлена сортировка по умолчанию', async () => {
      mockGetRelocationTasksSuccess({
        body: commonFixtures.paginatedListResponse(warehouseFixtures.relocationTasks()),
        once: false,
      })

      render(<RelocationTasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskTableTestUtils.expectLoadingFinished()
      const headCell = relocationTaskTableTestUtils.getHeadCell('Срок выполнения')

      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
    })

    test('Сортировка работает корректно', async () => {
      const relocationTasks = warehouseFixtures.relocationTasks()
      mockGetRelocationTasksSuccess({
        body: commonFixtures.paginatedListResponse(relocationTasks),
        once: false,
      })

      const { user } = render(<RelocationTasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskTableTestUtils.expectLoadingFinished()
      await relocationTaskTableTestUtils.clickColTitle(user, 'Объект выбытия')
      await relocationTaskTableTestUtils.expectLoadingStarted()
      await relocationTaskTableTestUtils.expectLoadingFinished()
      const headCell = relocationTaskTableTestUtils.getHeadCell('Объект выбытия')

      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      relocationTasks.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Фильтры', () => {
    describe('Кнопка фильтров', () => {
      test('Отображается корректно', async () => {
        mockGetRelocationTasksSuccess()

        render(<RelocationTasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await relocationTaskTableTestUtils.expectLoadingFinished()

        const button = relocationTasksPageTestUtils.getFilterButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Открывает фильтры', async () => {
        mockGetRelocationTasksSuccess()
        mockGetUsersSuccess()
        mockGetLocationsCatalogSuccess()

        const { user } = render(<RelocationTasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await relocationTaskTableTestUtils.expectLoadingFinished()

        await relocationTasksPageTestUtils.clickFilterButton(user)
        const filter = await relocationTasksFilterTestUtils.findContainer()

        expect(filter).toBeInTheDocument()
      })
    })

    // будет сделано в другом эпике
    test.skip('Устанавливаются корректные значения по умолчанию', async () => {
      mockGetRelocationTasksSuccess()
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess()

      const { user } = render(<RelocationTasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskTableTestUtils.expectLoadingFinished()
      await relocationTasksPageTestUtils.clickFilterButton(user)
      await relocationTasksFilterTestUtils.findContainer()

      await relocationTasksFilterTestUtils.openStatusSelect(user)
      const status1 = relocationTasksFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.New],
      )
      const status2 = relocationTasksFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.Completed],
      )
      const status3 = relocationTasksFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.Returned],
      )

      const type = selectTestUtils.getSelectedOption(relocationTasksFilterTestUtils.getTypeSelect())

      expect(status1).toBeInTheDocument()
      expect(status2).toBeInTheDocument()
      expect(status3).toBeInTheDocument()
      expect(type).not.toBeInTheDocument()
    })

    test('После применения список отображается корректно', async () => {
      const relocationTasks = warehouseFixtures.relocationTasks()
      mockGetRelocationTasksSuccess({
        body: commonFixtures.paginatedListResponse(relocationTasks),
        once: false,
      })
      mockGetUsersSuccess()
      mockGetLocationsCatalogSuccess()

      const { user } = render(<RelocationTasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskTableTestUtils.expectLoadingFinished()
      await relocationTasksPageTestUtils.clickFilterButton(user)
      await relocationTasksFilterTestUtils.findContainer()

      await relocationTasksFilterTestUtils.openStatusSelect(user)
      await relocationTasksFilterTestUtils.setStatus(
        user,
        relocationTaskStatusDict[RelocationTaskStatusEnum.Canceled],
      )

      await relocationTasksFilterTestUtils.openTypeSelect(user)
      await relocationTasksFilterTestUtils.setType(
        user,
        relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation],
        true,
      )

      await relocationTasksFilterTestUtils.clickApplyButton(user)

      await relocationTaskTableTestUtils.expectLoadingStarted()
      await relocationTaskTableTestUtils.expectLoadingFinished()

      relocationTasks.forEach((item) => {
        const row = relocationTaskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Карточка заявки на перемещение оборудования', () => {
    test('Открывается по клику на строку в таблице', async () => {
      const relocationTaskListItem = warehouseFixtures.relocationTaskListItem()
      mockGetRelocationTasksSuccess({
        body: commonFixtures.paginatedListResponse([relocationTaskListItem]),
      })
      mockGetRelocationTaskSuccess({ relocationTaskId: relocationTaskListItem.id })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTaskListItem.id })

      const { user } = render(<RelocationTasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskTableTestUtils.expectLoadingFinished()
      await relocationTaskTableTestUtils.clickRow(user, relocationTaskListItem.id)
      const details = await relocationTaskDetailsTestUtils.findContainer()

      expect(details).toBeInTheDocument()
    })

    test('Закрывается', async () => {
      const relocationTaskListItem = warehouseFixtures.relocationTaskListItem()
      mockGetRelocationTasksSuccess({
        body: commonFixtures.paginatedListResponse([relocationTaskListItem]),
      })
      mockGetRelocationTaskSuccess({ relocationTaskId: relocationTaskListItem.id })
      mockGetRelocationEquipmentsSuccess({ relocationTaskId: relocationTaskListItem.id })

      const { user } = render(<RelocationTasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await relocationTaskTableTestUtils.expectLoadingFinished()
      await relocationTaskTableTestUtils.clickRow(user, relocationTaskListItem.id)
      const details = await relocationTaskDetailsTestUtils.findContainer()
      await relocationTaskDetailsTestUtils.clickCloseButton(user)

      await waitFor(() => {
        expect(details).not.toBeInTheDocument()
      })
    })
  })

  describe('Создание заявки на перемещение оборудования', () => {
    describe('Кнопка создания', () => {
      test('Отображается корректно если есть права', () => {
        mockGetRelocationTasksSuccess()

        render(<RelocationTasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksCreate] }),
            },
          }),
        })

        const link = relocationTasksPageTestUtils.getCreateTaskLink()

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', WarehousesRoutesEnum.CreateRelocationTask)
      })

      test('Не отображается если нет прав', () => {
        mockGetRelocationTasksSuccess()

        render(<RelocationTasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        const link = relocationTasksPageTestUtils.queryCreateTaskLink()
        expect(link).not.toBeInTheDocument()
      })

      test('При клике переходит на страницу создания заявки', async () => {
        mockGetRelocationTasksSuccess()
        mockGetUsersSuccess()
        mockGetCurrenciesSuccess()
        mockGetLocationsCatalogSuccess({ once: false })

        const { user } = renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.RelocationTasks,
              element: <RelocationTasksPage />,
            },
            {
              path: WarehousesRoutesEnum.CreateRelocationTask,
              element: <CreateRelocationTaskPage />,
            },
          ],
          { initialEntries: [WarehousesRoutesEnum.RelocationTasks], initialIndex: 0 },
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksCreate] }),
              },
            }),
          },
        )

        await relocationTasksPageTestUtils.clickCreateTaskLink(user)
        const page = createRelocationTaskPageTestUtils.getContainer()

        expect(page).toBeInTheDocument()
      })
    })
  })
})
