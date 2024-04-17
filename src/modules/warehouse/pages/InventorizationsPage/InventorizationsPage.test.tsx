import { screen } from '@testing-library/react'

import { testUtils as inventorizationTableTestUtils } from 'modules/warehouse/components/InventorizationTable/InventorizationTable.test'
import { getInventorizationsErrMsg } from 'modules/warehouse/constants/inventorization'

import { ariaSortAttrAscValue, ariaSortAttrName } from '_tests_/constants/components'
import commonFixtures from '_tests_/fixtures/common'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetInventorizationsForbiddenError,
  mockGetInventorizationsServerError,
  mockGetInventorizationsSuccess,
} from '_tests_/mocks/api/warehouse'
import {
  fakeWord,
  notificationTestUtils,
  render,
  setupApiTests,
  tableTestUtils,
} from '_tests_/utils'

import InventorizationsPage from './index'

const getContainer = () => screen.getByTestId('inventorizations-page')

export const testUtils = {
  getContainer,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница списка инвентаризаций', () => {
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
