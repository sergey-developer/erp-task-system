import { DiscrepanciesEquipmentTableProps } from 'modules/warehouse/components/DiscrepanciesEquipmentTable/types'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const inventorizationEquipmentListItem = warehouseFixtures.inventorizationEquipmentListItem()

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
