import { InventorizationTableProps } from 'modules/warehouse/components/InventorizationTable/types'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const inventorizationListItem = warehouseFixtures.inventorizationListItem()

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
