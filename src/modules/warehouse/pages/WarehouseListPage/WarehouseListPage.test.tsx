import { screen } from '@testing-library/react'

import { RouteEnum } from 'configs/routes'

import { testUtils as warehouseTableTestUtils } from 'modules/warehouse/features/WarehouseTable/WarehouseTable.test'

import { renderInRoute_latest } from '_tests_/utils'

import WarehouseListPage from './index'

const getContainer = () => screen.getByTestId('warehouse-list-page')

const testUtils = {
  getContainer,
}

describe('Страница списка складов', () => {
  test('Отображает таблицу складов', () => {
    renderInRoute_latest(
      [
        {
          path: RouteEnum.WarehouseList,
          element: <WarehouseListPage />,
        },
      ],
      { initialEntries: [RouteEnum.WarehouseList] },
    )

    const warehouseTable = warehouseTableTestUtils.getContainer()
    expect(warehouseTable).toBeInTheDocument()
  })
})
