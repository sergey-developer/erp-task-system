import { screen } from '@testing-library/react'

import { RouteEnum } from 'configs/routes'

import { testUtils as warehouseTableTestUtils } from 'modules/warehouse/features/WarehouseTable/WarehouseTable.test'

import warehouseFixtures from 'fixtures/warehouse'

import { mockGetWarehouseListSuccess } from '_tests_/mocks/api'
import { renderInRoute_latest, setupApiTests } from '_tests_/utils'

import WarehouseListPage from './index'

const getContainer = () => screen.getByTestId('warehouse-list-page')

const testUtils = {
  getContainer,
}

setupApiTests()

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
})
