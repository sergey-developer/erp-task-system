import { InventorizationTableProps } from 'features/inventorizations/components/InventorizationTable/types'

import warehousesFixtures from '_tests_/fixtures/warehouse/index'

export const inventorizationListItem = warehousesFixtures.inventorizationListItem()

export const props: Readonly<InventorizationTableProps> = {
  dataSource: [inventorizationListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
  onRow: jest.fn(),
}

export enum TestIdsEnum {
  InventorizationTable = 'inventorization-table',
}
