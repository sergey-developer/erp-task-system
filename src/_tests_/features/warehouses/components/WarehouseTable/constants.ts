import { WarehouseTableProps } from 'features/warehouses/components/WarehouseTable/types'

import warehousesFixtures from '_tests_/fixtures/warehouse/index'

export const warehouseListItem = warehousesFixtures.warehouseListItem()

export const props: Readonly<WarehouseTableProps> = {
  dataSource: [warehouseListItem],
  loading: false,
  onChange: jest.fn(),
}

export enum TestIdsEnum {
  WarehouseTable = 'warehouse-table',
}
