import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { RouteEnum } from 'configs/routes'

import { testUtils as warehouseListFilterTestUtils } from 'modules/warehouse/components/WarehouseListFilter/WarehouseListFilter.test'
import { testUtils as warehouseTableTestUtils } from 'modules/warehouse/components/WarehouseTable/WarehouseTable.test'

import warehouseFixtures from 'fixtures/warehouse'

import { mockGetLegalEntityListSuccess, mockGetWarehouseListSuccess } from '_tests_/mocks/api'
import { buttonTestUtils, renderInRoute_latest, setupApiTests } from '_tests_/utils'

import WarehouseListPage from './index'

const getContainer = () => screen.getByTestId('warehouse-list-page')

// filter button
const getFilterButton = () => buttonTestUtils.getButtonIn(getContainer(), /filter/)

const clickFilterButton = async (user: UserEvent) => {
  const button = getFilterButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,

  getFilterButton,
  clickFilterButton,
}

setupApiTests()
// todo: сделать тесты для сортировки как в EquipmentListPage
describe('Страница списка складов', () => {
  test('Таблицу складов отображается корректно', async () => {
    const warehouseList = [warehouseFixtures.warehouseListItem()]
    mockGetWarehouseListSuccess({ body: warehouseList })

    renderInRoute_latest(
      [
        {
          path: RouteEnum.WarehouseList,
          element: <WarehouseListPage />,
        },
      ],
      { initialEntries: [RouteEnum.WarehouseList] },
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

      renderInRoute_latest(
        [
          {
            path: RouteEnum.WarehouseList,
            element: <WarehouseListPage />,
          },
        ],
        { initialEntries: [RouteEnum.WarehouseList] },
      )

      await warehouseTableTestUtils.expectLoadingFinished()

      const button = testUtils.getFilterButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Открывает фильтры', async () => {
      mockGetWarehouseListSuccess({ once: false })
      mockGetLegalEntityListSuccess()

      const { user } = renderInRoute_latest(
        [
          {
            path: RouteEnum.WarehouseList,
            element: <WarehouseListPage />,
          },
        ],
        { initialEntries: [RouteEnum.WarehouseList] },
      )

      await warehouseTableTestUtils.expectLoadingFinished()

      await testUtils.clickFilterButton(user)
      const filter = await warehouseListFilterTestUtils.findContainer()

      expect(filter).toBeInTheDocument()
    })
  })
})
