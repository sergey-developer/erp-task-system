import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'

import { warehouseListFilterTestUtils } from '_tests_/features/warehouses/components/WarehouseListFilter/testUtils'
import { warehouseTableTestUtils } from '_tests_/features/warehouses/components/WarehouseTable/testUtils'
import { warehouseListPageTestUtils } from '_tests_/features/warehouses/pages/WarehouseListPage/testUtils'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { mockGetLegalEntitiesSuccess, mockGetWarehousesSuccess } from '_tests_/mocks/api'
import { renderWithRouter, setupApiTests } from '_tests_/helpers'

import WarehousesPage from './index'

setupApiTests()
// todo: сделать тесты для сортировки как в EquipmentsPage
describe('Страница списка складов', () => {
  test('Таблица складов отображается корректно', async () => {
    const warehouseList = [warehouseFixtures.warehouseListItem()]
    mockGetWarehousesSuccess({ body: warehouseList })

    renderWithRouter(
      [
        {
          path: WarehousesRoutesEnum.Warehouses,
          element: <WarehousesPage />,
        },
      ],
      { initialEntries: [WarehousesRoutesEnum.Warehouses] },
    )

    await warehouseTableTestUtils.expectLoadingFinished()

    warehouseList.forEach((item) => {
      const row = warehouseTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Кнопка "Фильтры"', () => {
    test('Отображается корректно', async () => {
      mockGetWarehousesSuccess()

      renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.Warehouses,
            element: <WarehousesPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Warehouses] },
      )

      await warehouseTableTestUtils.expectLoadingFinished()

      const button = warehouseListPageTestUtils.getFilterButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Открывает фильтры', async () => {
      mockGetWarehousesSuccess({ once: false })
      mockGetLegalEntitiesSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.Warehouses,
            element: <WarehousesPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Warehouses] },
      )

      await warehouseTableTestUtils.expectLoadingFinished()

      await warehouseListPageTestUtils.clickFilterButton(user)
      const filter = await warehouseListFilterTestUtils.findContainer()

      expect(filter).toBeInTheDocument()
    })
  })
})
