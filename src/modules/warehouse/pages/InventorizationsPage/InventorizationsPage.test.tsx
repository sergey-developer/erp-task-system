import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as inventorizationTableTestUtils } from 'modules/warehouse/components/InventorizationTable/InventorizationTable.test'
import { testUtils as inventorizationsFilterTestUtils } from 'modules/warehouse/components/InventorizationsFilter/InventorizationsFilter.test'
import {
  getInventorizationsErrMsg,
  inventorizationStatusDict,
  InventorizationStatusEnum,
  inventorizationTypeDict,
  InventorizationTypeEnum,
} from 'modules/warehouse/constants/inventorization'

import { ariaSortAttrAscValue, ariaSortAttrName } from '_tests_/constants/components'
import commonFixtures from '_tests_/fixtures/common'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetInventorizationsForbiddenError,
  mockGetInventorizationsServerError,
  mockGetInventorizationsSuccess,
} from '_tests_/mocks/api/warehouse'
import {
  buttonTestUtils,
  fakeWord,
  notificationTestUtils,
  render,
  setupApiTests,
  tableTestUtils,
} from '_tests_/utils'

import InventorizationsPage from './index'

const getContainer = () => screen.getByTestId('inventorizations-page')

// filter button
const getFilterButton = () => buttonTestUtils.getFilterButtonIn(getContainer())
const clickFilterButton = (user: UserEvent) =>
  buttonTestUtils.clickFilterButtonIn(getContainer(), user)

export const testUtils = {
  getContainer,

  getFilterButton,
  clickFilterButton,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница списка инвентаризаций', () => {
  describe('Список инвентаризаций', () => {
    test('При успешном запросе отображается', async () => {
      const inventorizations = warehouseFixtures.inventorizations()
      mockGetInventorizationsSuccess({
        body: commonFixtures.paginatedListResponse(inventorizations),
      })

      render(<InventorizationsPage />)

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

        render(<InventorizationsPage />)

        await inventorizationTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(errorMessage)

        expect(notification).toBeInTheDocument()
      })

      test('Обрабатывается ошибка 500', async () => {
        mockGetInventorizationsServerError()

        render(<InventorizationsPage />)

        await inventorizationTableTestUtils.expectLoadingFinished()
        const notification = await notificationTestUtils.findNotification(getInventorizationsErrMsg)

        expect(notification).toBeInTheDocument()
      })
    })

    test('Пагинация работает', async () => {
      const inventorizations = warehouseFixtures.inventorizations(11)
      mockGetInventorizationsSuccess({
        body: commonFixtures.paginatedListResponse(inventorizations),
        once: false,
      })

      const { user } = render(<InventorizationsPage />)

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
        body: commonFixtures.paginatedListResponse(warehouseFixtures.inventorizations()),
        once: false,
      })

      render(<InventorizationsPage />)

      await inventorizationTableTestUtils.expectLoadingFinished()
      const headCell = inventorizationTableTestUtils.getHeadCell('Срок выполнения')

      expect(headCell).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
    })

    test('Сортировка работает корректно', async () => {
      const inventorizations = warehouseFixtures.inventorizations()
      mockGetInventorizationsSuccess({
        body: commonFixtures.paginatedListResponse(inventorizations),
        once: false,
      })

      const { user } = render(<InventorizationsPage />)

      await inventorizationTableTestUtils.expectLoadingFinished()
      await inventorizationTableTestUtils.clickColTitle(user, 'Тип заявки')
      await inventorizationTableTestUtils.expectLoadingStarted()
      await inventorizationTableTestUtils.expectLoadingFinished()
      const headCell = inventorizationTableTestUtils.getHeadCell('Тип заявки')

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

      const { user } = render(<InventorizationsPage />)

      await inventorizationTableTestUtils.expectLoadingFinished()
      await testUtils.clickFilterButton(user)
      const filter = await inventorizationsFilterTestUtils.findContainer()

      expect(filter).toBeInTheDocument()
    })

    test('Устанавливаются корректные значения по умолчанию', async () => {
      mockGetInventorizationsSuccess()

      const { user } = render(<InventorizationsPage />)

      await inventorizationTableTestUtils.expectLoadingFinished()
      await testUtils.clickFilterButton(user)
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

    test('После применения список отображается', async () => {
      const inventorizations = warehouseFixtures.inventorizations()
      mockGetInventorizationsSuccess({
        body: commonFixtures.paginatedListResponse(inventorizations),
        once: false,
      })

      const { user } = render(<InventorizationsPage />)

      await inventorizationTableTestUtils.expectLoadingFinished()
      await testUtils.clickFilterButton(user)
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
})
