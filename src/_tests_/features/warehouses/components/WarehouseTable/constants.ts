import { WarehouseTableProps } from 'features/warehouses/components/WarehouseTable/types'

import warehousesFixtures from '_tests_/fixtures/api/data/warehouses'

export const warehouseListItem = warehousesFixtures.warehouse()

export const props: Readonly<WarehouseTableProps> = {
  dataSource: [warehouseListItem],
  loading: false,
  onChange: jest.fn(),
}

export enum TestIdsEnum {
  WarehouseTable = 'warehouse-table',
}
