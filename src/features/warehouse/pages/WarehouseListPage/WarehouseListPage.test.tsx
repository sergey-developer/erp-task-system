import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'

import { warehouseListFilterTestUtils } from '_tests_/features/warehouse/components/WarehouseListFilter/testUtils'
import { warehouseTableTestUtils } from '_tests_/features/warehouse/components/WarehouseTable/testUtils'
import { warehouseListPageTestUtils } from '_tests_/features/warehouse/pages/WarehouseListPage/testUtils'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { mockGetLegalEntityListSuccess, mockGetWarehouseListSuccess } from '_tests_/mocks/api'
import { renderWithRouter, setupApiTests } from '_tests_/utils'

import WarehouseListPage from './index'

setupApiTests()
// todo: сделать тесты для сортировки как в EquipmentsPage
describe('Страница списка складов', () => {
  test('Таблица складов отображается корректно', async () => {
    const warehouseList = [warehouseFixtures.warehouseListItem()]
    mockGetWarehouseListSuccess({ body: warehouseList })

    renderWithRouter(
      [
        {
          path: WarehouseRouteEnum.Warehouses,
          element: <WarehouseListPage />,
        },
      ],
      { initialEntries: [WarehouseRouteEnum.Warehouses] },
    )

    await warehouseTableTestUtils.expectLoadingFinished()

    warehouseList.forEach((item) => {
      const row = warehouseTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Кнопка "Фильтры"', () => {
    test('Отображается корректно', async () => {
      mockGetWarehouseListSuccess()

      renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Warehouses,
            element: <WarehouseListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Warehouses] },
      )

      await warehouseTableTestUtils.expectLoadingFinished()

      const button = warehouseListPageTestUtils.getFilterButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Открывает фильтры', async () => {
      mockGetWarehouseListSuccess({ once: false })
      mockGetLegalEntityListSuccess()

      const { user } = renderWithRouter(
        [
          {
            path: WarehouseRouteEnum.Warehouses,
            element: <WarehouseListPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Warehouses] },
      )

      await warehouseTableTestUtils.expectLoadingFinished()

      await warehouseListPageTestUtils.clickFilterButton(user)
      const filter = await warehouseListFilterTestUtils.findContainer()

      expect(filter).toBeInTheDocument()
    })
  })
})
