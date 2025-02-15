import { getWarehouseErrorMessage } from 'features/warehouses/api/constants'
import { makeWarehousePageLink } from 'features/warehouses/helpers'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'

import { warehousePageTestUtils } from '_tests_/features/warehouse/pages/WarehousePage/testUtils'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import {
  mockGetWarehouseNotFoundError,
  mockGetWarehouseServerError,
  mockGetWarehouseSuccess,
} from '_tests_/mocks/api'
import {
  fakeId,
  fakeWord,
  notificationTestUtils,
  renderWithRouter,
  setupApiTests,
} from '_tests_/utils'

import WarehousePage from './index'

setupApiTests()
notificationTestUtils.setupNotifications()

describe('Страница склада', () => {
  describe('При успешном запросе', () => {
    describe('Наименование объекта', () => {
      test('Отображается корректно', async () => {
        const warehouse = warehouseFixtures.warehouse({ id: 1 })
        mockGetWarehouseSuccess(warehouse.id, { body: warehouse })

        renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [makeWarehousePageLink(warehouse.id)] },
        )

        await warehousePageTestUtils.expectLoadingFinished()
        const label = warehousePageTestUtils.getChildByText('Наименование объекта')
        const value = warehousePageTestUtils.getChildByText(warehouse.title)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Родительский склад', () => {
      test('Отображается корректно', async () => {
        const warehouse = warehouseFixtures.warehouse({ id: 1 })
        mockGetWarehouseSuccess(warehouse.id, { body: warehouse })

        renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [makeWarehousePageLink(warehouse.id)] },
        )

        await warehousePageTestUtils.expectLoadingFinished()
        const label = warehousePageTestUtils.getChildByText('Родительский склад')
        const value = warehousePageTestUtils.getChildByText(warehouse.parent!.title)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Юридическое лицо', () => {
      test('Отображается корректно', async () => {
        const warehouse = warehouseFixtures.warehouse({ id: 1 })
        mockGetWarehouseSuccess(warehouse.id, { body: warehouse })

        renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [makeWarehousePageLink(warehouse.id)] },
        )

        await warehousePageTestUtils.expectLoadingFinished()
        const label = warehousePageTestUtils.getChildByText('Юридическое лицо')
        const value = warehousePageTestUtils.getChildByText(warehouse.legalEntity.title)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Адрес', () => {
      test('Отображается корректно', async () => {
        const warehouse = warehouseFixtures.warehouse({ id: 1 })
        mockGetWarehouseSuccess(warehouse.id, { body: warehouse })

        renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [makeWarehousePageLink(warehouse.id)] },
        )

        await warehousePageTestUtils.expectLoadingFinished()
        const label = warehousePageTestUtils.getChildByText('Адрес')
        const value = warehousePageTestUtils.getChildByText(warehouse.address)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Макрорегионы', () => {
      test('Отображается корректно', async () => {
        const warehouse = warehouseFixtures.warehouse({ id: 1 })
        mockGetWarehouseSuccess(warehouse.id, { body: warehouse })

        renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [makeWarehousePageLink(warehouse.id)] },
        )

        await warehousePageTestUtils.expectLoadingFinished()
        const label = warehousePageTestUtils.getChildByText('Макрорегионы')

        expect(label).toBeInTheDocument()
        warehouse.macroregions!.forEach((m) => {
          const value = warehousePageTestUtils.getChildByText(m.title)
          expect(value).toBeInTheDocument()
        })
      })
    })

    describe('Договор', () => {
      test('Отображается корректно', async () => {
        const warehouse = warehouseFixtures.warehouse({ id: 1 })
        mockGetWarehouseSuccess(warehouse.id, { body: warehouse })

        renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [makeWarehousePageLink(warehouse.id)] },
        )

        await warehousePageTestUtils.expectLoadingFinished()
        const label = warehousePageTestUtils.getChildByText('Договор')
        const value = warehousePageTestUtils.getChildByText(warehouse.contract!)

        expect(label).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })

    describe('Прочие данные', () => {
      test('Отображается корректно', async () => {
        const warehouse = warehouseFixtures.warehouse({ id: 1 })
        mockGetWarehouseSuccess(warehouse.id, { body: warehouse })

        renderWithRouter(
          [
            {
              path: WarehousesRoutesEnum.Warehouse,
              element: <WarehousePage />,
            },
          ],
          { initialEntries: [makeWarehousePageLink(warehouse.id)] },
        )

        await warehousePageTestUtils.expectLoadingFinished()
        const label = warehousePageTestUtils.getChildByText('Прочие данные')
        const value = warehousePageTestUtils.getChildByText(warehouse.notes!)

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

      renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.Warehouse,
            element: <WarehousePage />,
          },
        ],
        { initialEntries: [makeWarehousePageLink(warehouseId)] },
      )

      await warehousePageTestUtils.expectLoadingFinished()

      const notification = await notificationTestUtils.findNotification(errorMessage)
      expect(notification).toBeInTheDocument()
    })

    test('Обрабатывается ошибка 500', async () => {
      const warehouseId = fakeId()
      mockGetWarehouseServerError(warehouseId)

      renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.Warehouse,
            element: <WarehousePage />,
          },
        ],
        { initialEntries: [makeWarehousePageLink(warehouseId)] },
      )

      await warehousePageTestUtils.expectLoadingFinished()

      const notification = await notificationTestUtils.findNotification(getWarehouseErrorMessage)
      expect(notification).toBeInTheDocument()
    })
  })
})
