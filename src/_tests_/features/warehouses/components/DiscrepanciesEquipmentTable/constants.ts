import { DiscrepanciesEquipmentTableProps } from 'features/inventorizations/components/DiscrepanciesEquipmentTable/types'

import warehousesFixtures from '_tests_/fixtures/warehouse/index'

export const inventorizationEquipmentListItem =
  warehousesFixtures.inventorizationEquipmentListItem()

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
