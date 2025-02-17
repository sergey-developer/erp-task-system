import { DiscrepanciesEquipmentTableProps } from 'features/inventorizations/components/DiscrepanciesEquipmentTable/types'

import inventorizationsFixtures from '_tests_/fixtures/api/data/inventorizations'

export const inventorizationEquipmentListItem = inventorizationsFixtures.inventorizationEquipment()

export const props: Readonly<DiscrepanciesEquipmentTableProps> = {
  dataSource: [inventorizationEquipmentListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
  sort: undefined,
}

export enum TestIdsEnum {
  DiscrepanciesEquipmentTable = 'discrepancies-equipment-table',
}
