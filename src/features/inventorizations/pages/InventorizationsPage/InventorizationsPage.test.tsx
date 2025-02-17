import {
  getInventorizationsErrorMessage,
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'features/inventorizations/api/constants'
import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'features/inventorizations/constants'

import { ariaSortAttrAscValue, ariaSortAttrName } from '_tests_/constants/components'
import { inventorizationDetailsTestUtils } from '_tests_/features/warehouses/components/InventorizationDetails/testUtils'
import { inventorizationTableTestUtils } from '_tests_/features/warehouses/components/InventorizationTable/testUtils'
import { inventorizationsFilterTestUtils } from '_tests_/features/warehouses/components/InventorizationsFilter/testUtils'
import { inventorizationsPageTestUtils } from '_tests_/features/warehouses/pages/InventorizationsPage/testUtils'
import commonFixtures from '_tests_/fixtures/api/common'
import inventorizationsFixtures from '_tests_/fixtures/api/data/inventorizations'
import userFixtures from '_tests_/fixtures/api/data/users'
import { getStoreWithAuth } from '_tests_/fixtures/store/auth'
import { getUserMeQueryMock } from '_tests_/fixtures/store/users'
import {
  fakeWord,
  notificationTestUtils,
  render,
  setupApiTests,
  tableTestUtils,
} from '_tests_/helpers'
import {
  mockGetInventorizationsForbiddenError,
  mockGetInventorizationsServerError,
  mockGetInventorizationsSuccess,
  mockGetInventorizationSuccess,
} from '_tests_/mocks/api'

import InventorizationsPage from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница списка инвентаризаций', () => {
  describe.skip('Список инвентаризаций', () => {
    test('При успешном запросе отображается', async () => {
      const inventorizations = inventorizationsFixtures.inventorizations()
      mockGetInventorizationsSuccess({
        body: commonFixtures.paginatedListResponse(inventorizations),
      })

      render(<InventorizationsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await inventorizationTableTestUtils.expectLoadingFinished()

      inventorizations.forEach((item) => {
        const row = inventorizationTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    describe('При не успешном запросе', () => {
      test('Обрабатывается ошибка 403', async () => {
        const errorMessage = fakeWord()
        mockGetInventorizationsForbiddenError({ body: { detail: errorMessage } })

        render(<InventorizationsPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await inventorizationTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(errorMessage)

        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetInventorizationsServerError()

        render(<InventorizationsPage />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await inventorizationTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(
          getInventorizationsErrorMessage,
        )

        expect(notification).toBeInTheDocument()
      })
    })

    test('Пагинация работает', async () => {
      const inventorizations = inventorizationsFixtures.inventorizations(11)
      mockGetInventorizationsSuccess({
        body: commonFixtures.paginatedListResponse(inventorizations),
        once: false,
      })

      const { user } = render(<InventorizationsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const table = await inventorizationTableTestUtils.expectLoadingFinished()
      await tableTestUtils.clickPaginationNextButtonIn(user, table)
      await inventorizationTableTestUtils.expectLoadingStarted()
      await inventorizationTableTestUtils.expectLoadingFinished()

      inventorizations.slice(-1).forEach((item) => {
        const row = inventorizationTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })

    test('Установлена сортировка по умолчанию', async () => {
      mockGetInventorizationsSuccess({
        body: commonFixtures.paginatedListResponse(inventorizationsFixtures.inventorizations()),
        once: false,
      })

      render(<InventorizationsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await inventorizationTableTestUtils.expectLoadingFinished()
      const headCell = inventorizationTableTestUtils.getHeadCell('Срок выполнения')

      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
    })

    test('Сортировка работает корректно', async () => {
      const inventorizations = inventorizationsFixtures.inventorizations()
      mockGetInventorizationsSuccess({
        body: commonFixtures.paginatedListResponse(inventorizations),
        once: false,
      })

      const { user } = render(<InventorizationsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await inventorizationTableTestUtils.expectLoadingFinished()
      await inventorizationTableTestUtils.clickColTitle(user, 'Тип')
      await inventorizationTableTestUtils.expectLoadingStarted()
      await inventorizationTableTestUtils.expectLoadingFinished()
      const headCell = inventorizationTableTestUtils.getHeadCell('Тип')

      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      inventorizations.forEach((item) => {
        const row = inventorizationTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Фильтры', () => {
    test('Открываются', async () => {
      mockGetInventorizationsSuccess()

      const { user } = render(<InventorizationsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await inventorizationTableTestUtils.expectLoadingFinished()
      await inventorizationsPageTestUtils.clickFilterButton(user)
      const filter = await inventorizationsFilterTestUtils.findContainer()

      expect(filter).toBeInTheDocument()
    })

    test('Устанавливаются корректные значения по умолчанию', async () => {
      mockGetInventorizationsSuccess()

      const { user } = render(<InventorizationsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await inventorizationTableTestUtils.expectLoadingFinished()
      await inventorizationsPageTestUtils.clickFilterButton(user)
      await inventorizationsFilterTestUtils.findContainer()

      await inventorizationsFilterTestUtils.openStatusSelect(user)
      const status1 = inventorizationsFilterTestUtils.getSelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.New],
      )
      const status2 = inventorizationsFilterTestUtils.getSelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.InProgress],
      )
      const status3 = inventorizationsFilterTestUtils.getSelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.Completed],
      )
      const status4 = inventorizationsFilterTestUtils.getSelectedStatus(
        inventorizationStatusDict[InventorizationStatusEnum.Closed],
      )

      const type1 = inventorizationsFilterTestUtils.getSelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.Internal],
      )
      const type2 = inventorizationsFilterTestUtils.getSelectedType(
        inventorizationTypeDict[InventorizationTypeEnum.External],
      )

      expect(status1).toBeInTheDocument()
      expect(status2).toBeInTheDocument()
      expect(status3).toBeInTheDocument()
      expect(status4).toBeInTheDocument()
      expect(type1).toBeInTheDocument()
      expect(type2).toBeInTheDocument()
    })

    test.skip('После применения список отображается', async () => {
      const inventorizations = inventorizationsFixtures.inventorizations()
      mockGetInventorizationsSuccess({
        body: commonFixtures.paginatedListResponse(inventorizations),
        once: false,
      })

      const { user } = render(<InventorizationsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await inventorizationTableTestUtils.expectLoadingFinished()
      await inventorizationsPageTestUtils.clickFilterButton(user)
      await inventorizationsFilterTestUtils.findContainer()

      await inventorizationsFilterTestUtils.openStatusSelect(user)
      await inventorizationsFilterTestUtils.unSetStatus(
        user,
        inventorizationStatusDict[InventorizationStatusEnum.Completed],
      )

      await inventorizationsFilterTestUtils.clickApplyButton(user)

      await inventorizationTableTestUtils.expectLoadingStarted()
      await inventorizationTableTestUtils.expectLoadingFinished()

      inventorizations.forEach((item) => {
        const row = inventorizationTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Карточка инвентаризации', () => {
    test.skip('Открывается при клике на строку', async () => {
      const inventorizationListItem = inventorizationsFixtures.inventorization()
      mockGetInventorizationsSuccess({
        body: commonFixtures.paginatedListResponse([inventorizationListItem]),
      })

      mockGetInventorizationSuccess({ inventorizationId: inventorizationListItem.id })

      const { user } = render(<InventorizationsPage />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await inventorizationTableTestUtils.expectLoadingFinished()
      await inventorizationTableTestUtils.clickRow(user, inventorizationListItem.id)
      const details = await inventorizationDetailsTestUtils.findContainer()

      expect(details).toBeInTheDocument()
    })
  })

  test.todo('Создание поручения на инвентаризацию')
})
