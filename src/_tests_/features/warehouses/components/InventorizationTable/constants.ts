import { InventorizationTableProps } from 'features/inventorizations/components/InventorizationTable/types'

import inventorizationsFixtures from '_tests_/fixtures/api/data/inventorizations'

export const inventorizationListItem = inventorizationsFixtures.inventorization()

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
