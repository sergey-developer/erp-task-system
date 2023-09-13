import { screen, within } from '@testing-library/react'

import { RouteEnum } from 'configs/routes'

import { getWarehouseMessages } from 'modules/warehouse/constants/warehouse'
import { getWarehousePageLink } from 'modules/warehouse/utils'

import warehouseFixtures from '_tests_/fixtures/warehouse'

import {
  mockGetWarehouseNotFoundError,
  mockGetWarehouseServerError,
  mockGetWarehouseSuccess,
} from '_tests_/mocks/api'
import {
  spinnerTestUtils,
  fakeId,
  fakeWord,
  renderInRoute_latest,
  setupApiTests,
  notificationTestUtils,
} from '_tests_/utils'

import WarehousePage from './index'

const getContainer = () => screen.getByTestId('warehouse-page')

const getChildByText = (value: string) => within(getContainer()).getByText(value)

const expectLoadingStarted = spinnerTestUtils.expectLoadingStarted('warehouse-loading')

const expectLoadingFinished = spinnerTestUtils.expectLoadingFinished('warehouse-loading')

export const testUtils = {
  getContainer,
  getChildByText,

  expectLoadingStarted,
  expectLoadingFinished,
}

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница склада', () => {
  describe('При успешном запросе', () => {
    describe('Наименование объекта', () => {
      test('Отображается корректно', async () => {
        const warehouse = warehouseFixtures.warehouse({ id: 1 })
        mockGetWarehouseSuccess(warehouse.id, { body: warehouse })

        renderInRoute_latest(
          [
            {
              path: RouteEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [getWarehousePageLink(warehouse.id)] },
        )

        await testUtils.expectLoadingFinished()
        const label = testUtils.getChildByText('Наименование объекта')
        const value = testUtils.getChildByText(warehouse.title)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Родительский склад', () => {
      test('Отображается корректно', async () => {
        const warehouse = warehouseFixtures.warehouse({ id: 1 })
        mockGetWarehouseSuccess(warehouse.id, { body: warehouse })

        renderInRoute_latest(
          [
            {
              path: RouteEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [getWarehousePageLink(warehouse.id)] },
        )

        await testUtils.expectLoadingFinished()
        const label = testUtils.getChildByText('Родительский склад')
        const value = testUtils.getChildByText(warehouse.parent!.title)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Юридическое лицо', () => {
      test('Отображается корректно', async () => {
        const warehouse = warehouseFixtures.warehouse({ id: 1 })
        mockGetWarehouseSuccess(warehouse.id, { body: warehouse })

        renderInRoute_latest(
          [
            {
              path: RouteEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [getWarehousePageLink(warehouse.id)] },
        )

        await testUtils.expectLoadingFinished()
        const label = testUtils.getChildByText('Юридическое лицо')
        const value = testUtils.getChildByText(warehouse.legalEntity.title)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Адрес', () => {
      test('Отображается корректно', async () => {
        const warehouse = warehouseFixtures.warehouse({ id: 1 })
        mockGetWarehouseSuccess(warehouse.id, { body: warehouse })

        renderInRoute_latest(
          [
            {
              path: RouteEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [getWarehousePageLink(warehouse.id)] },
        )

        await testUtils.expectLoadingFinished()
        const label = testUtils.getChildByText('Адрес')
        const value = testUtils.getChildByText(warehouse.address)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Договор', () => {
      test('Отображается корректно', async () => {
        const warehouse = warehouseFixtures.warehouse({ id: 1 })
        mockGetWarehouseSuccess(warehouse.id, { body: warehouse })

        renderInRoute_latest(
          [
            {
              path: RouteEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [getWarehousePageLink(warehouse.id)] },
        )

        await testUtils.expectLoadingFinished()
        const label = testUtils.getChildByText('Договор')
        const value = testUtils.getChildByText(warehouse.contract!)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Прочие данные', () => {
      test('Отображается корректно', async () => {
        const warehouse = warehouseFixtures.warehouse({ id: 1 })
        mockGetWarehouseSuccess(warehouse.id, { body: warehouse })

        renderInRoute_latest(
          [
            {
              path: RouteEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [getWarehousePageLink(warehouse.id)] },
        )

        await testUtils.expectLoadingFinished()
        const label = testUtils.getChildByText('Прочие данные')
        const value = testUtils.getChildByText(warehouse.notes!)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })
  })

  describe('При не успешном запросе', () => {
    test('Обрабатывается ошибка 404', async () => {
      const warehouseId = fakeId()
      const errorMessage = fakeWord()
      mockGetWarehouseNotFoundError(warehouseId, {
        body: { detail: errorMessage },
      })

      renderInRoute_latest(
        [
          {
            path: RouteEnum.Warehouse,
            element: <WarehousePage />,
          },
        ],
        { initialEntries: [getWarehousePageLink(warehouseId)] },
      )

      await testUtils.expectLoadingFinished()

      const notification = await notificationTestUtils.findNotification(errorMessage)
      expect(notification).toBeInTheDocument()
    })

    test('Обрабатывается ошибка 500', async () => {
      const warehouseId = fakeId()
      mockGetWarehouseServerError(warehouseId)

      renderInRoute_latest(
        [
          {
            path: RouteEnum.Warehouse,
            element: <WarehousePage />,
          },
        ],
        { initialEntries: [getWarehousePageLink(warehouseId)] },
      )

      await testUtils.expectLoadingFinished()

      const notification = await notificationTestUtils.findNotification(
        getWarehouseMessages.commonError,
      )
      expect(notification).toBeInTheDocument()
    })
  })
})
