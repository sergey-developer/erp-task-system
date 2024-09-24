import { WarehouseTableProps } from 'modules/warehouse/components/WarehouseTable/types'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const warehouseListItem = warehouseFixtures.warehouseListItem()

export const props: Readonly<WarehouseTableProps> = {
  dataSource: [warehouseListItem],
  loading: false,
  onChange: jest.fn(),
}

export enum TestIdsEnum {
  WarehouseTable = 'warehouse-table',
}
