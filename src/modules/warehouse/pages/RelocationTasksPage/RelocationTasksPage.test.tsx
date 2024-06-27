import { screen, waitFor } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { UserPermissionsEnum } from 'modules/user/constants'
import { testUtils as relocationTaskDetailsTestUtils } from 'modules/warehouse/components/RelocationTaskDetails/RelocationTaskDetails.test'
import { testUtils as relocationTaskTableTestUtils } from 'modules/warehouse/components/RelocationTaskTable/RelocationTaskTable.test'
import { testUtils as relocationTaskListFilterTestUtils } from 'modules/warehouse/components/RelocationTasksFilter/RelocationTasksFilter.test'
import {
  getRelocationTasksErrMsg,
  relocationTaskStatusDict,
  RelocationTaskStatusEnum,
  relocationTaskTypeDict,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { testUtils as createRelocationTaskPageTestUtils } from 'modules/warehouse/pages/CreateRelocationTaskPage/CreateRelocationTaskPage.test'

import { ariaSortAttrAscValue, ariaSortAttrName } from '_tests_/constants/components'
import commonFixtures from '_tests_/fixtures/common'
import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetCurrencyListSuccess,
  mockGetLocationListSuccess,
  mockGetRelocationEquipmentListSuccess,
  mockGetRelocationTasksForbiddenError,
  mockGetRelocationTasksServerError,
  mockGetRelocationTasksSuccess,
  mockGetRelocationTaskSuccess,
  mockGetUsersSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeWord,
  getStoreWithAuth,
  linkTestUtils,
  notificationTestUtils,
  render,
  renderInRoute_latest,
  selectTestUtils,
  setupApiTests,
  tableTestUtils,
} from '_tests_/utils'

import CreateRelocationTaskPage from '../CreateRelocationTaskPage'
import RelocationTasksPage from './index'

const getContainer = () => screen.getByTestId('relocation-tasks-page')

const getFilterButton = () => buttonTestUtils.getFilterButtonIn(getContainer())
const clickFilterButton = (user: UserEvent) =>
  buttonTestUtils.clickFilterButtonIn(getContainer(), user)

const getCreateTaskLink = () => linkTestUtils.getLinkIn(getContainer(), 'Создать заявку')
const queryCreateTaskLink = () => linkTestUtils.queryLinkIn(getContainer(), 'Создать заявку')
const clickCreateTaskLink = (user: UserEvent) =>
  linkTestUtils.clickLinkIn(getContainer(), user, 'Создать заявку')

export const testUtils = {
  getContainer,

  getFilterButton,
  clickFilterButton,

  getCreateTaskLink,
  queryCreateTaskLink,
  clickCreateTaskLink,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница списка заявок на перемещение оборудования', () => {
  describe('Список заявок на перемещение оборудования', () => {
    test('При успешном запросе отображается корректно', async () => {
      const relocationTasks = warehouseFixtures.relocationTasks()
      mockGetRelocationTasksSuccess({
        body: commonFixtures.paginatedListResponse(relocationTasks),
      })

      render(<RelocationTasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
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
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
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
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await relocationTaskTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(getRelocationTasksErrMsg)

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
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
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
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
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
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
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
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await relocationTaskTableTestUtils.expectLoadingFinished()

        const button = testUtils.getFilterButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Открывает фильтры', async () => {
        mockGetRelocationTasksSuccess()
        mockGetUsersSuccess()
        mockGetLocationListSuccess()

        const { user } = render(<RelocationTasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await relocationTaskTableTestUtils.expectLoadingFinished()

        await testUtils.clickFilterButton(user)
        const filter = await relocationTaskListFilterTestUtils.findContainer()

        expect(filter).toBeInTheDocument()
      })
    })

    // будет сделано в другом эпике
    test.skip('Устанавливаются корректные значения по умолчанию', async () => {
      mockGetRelocationTasksSuccess()
      mockGetUsersSuccess()
      mockGetLocationListSuccess()

      const { user } = render(<RelocationTasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await relocationTaskTableTestUtils.expectLoadingFinished()
      await testUtils.clickFilterButton(user)
      await relocationTaskListFilterTestUtils.findContainer()

      await relocationTaskListFilterTestUtils.openStatusSelect(user)
      const status1 = relocationTaskListFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.New],
      )
      const status2 = relocationTaskListFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.Completed],
      )
      const status3 = relocationTaskListFilterTestUtils.getSelectedStatus(
        relocationTaskStatusDict[RelocationTaskStatusEnum.Returned],
      )

      const type = selectTestUtils.getSelectedOption(
        relocationTaskListFilterTestUtils.getTypeSelect(),
      )

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
      mockGetLocationListSuccess()

      const { user } = render(<RelocationTasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await relocationTaskTableTestUtils.expectLoadingFinished()
      await testUtils.clickFilterButton(user)
      await relocationTaskListFilterTestUtils.findContainer()

      await relocationTaskListFilterTestUtils.openStatusSelect(user)
      await relocationTaskListFilterTestUtils.setStatus(
        user,
        relocationTaskStatusDict[RelocationTaskStatusEnum.Canceled],
      )

      await relocationTaskListFilterTestUtils.openTypeSelect(user)
      await relocationTaskListFilterTestUtils.setType(
        user,
        relocationTaskTypeDict[RelocationTaskTypeEnum.Relocation],
        true,
      )

      await relocationTaskListFilterTestUtils.clickApplyButton(user)

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
      mockGetRelocationTaskSuccess(relocationTaskListItem.id)
      mockGetRelocationEquipmentListSuccess(relocationTaskListItem.id)

      const { user } = render(<RelocationTasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
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
      mockGetRelocationTaskSuccess(relocationTaskListItem.id)
      mockGetRelocationEquipmentListSuccess(relocationTaskListItem.id)

      const { user } = render(<RelocationTasksPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
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

        const link = testUtils.getCreateTaskLink()

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', WarehouseRouteEnum.CreateRelocationTask)
      })

      test('Не отображается если нет прав', () => {
        mockGetRelocationTasksSuccess()

        render(<RelocationTasksPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        const link = testUtils.queryCreateTaskLink()
        expect(link).not.toBeInTheDocument()
      })

      test('При клике переходит на страницу создания заявки', async () => {
        mockGetRelocationTasksSuccess()
        mockGetUsersSuccess()
        mockGetCurrencyListSuccess()
        mockGetLocationListSuccess({ once: false })

        const { user } = renderInRoute_latest(
          [
            {
              path: WarehouseRouteEnum.RelocationTasks,
              element: <RelocationTasksPage />,
            },
            {
              path: WarehouseRouteEnum.CreateRelocationTask,
              element: <CreateRelocationTaskPage />,
            },
          ],
          { initialEntries: [WarehouseRouteEnum.RelocationTasks], initialIndex: 0 },
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: {
                ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.RelocationTasksCreate] }),
              },
            }),
          },
        )

        await testUtils.clickCreateTaskLink(user)
        const page = createRelocationTaskPageTestUtils.getContainer()

        expect(page).toBeInTheDocument()
      })
    })
  })
})
