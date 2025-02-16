import { EquipmentTableProps } from 'features/equipments/components/EquipmentTable/types'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const equipmentListItem = warehouseFixtures.equipmentListItem()

export const props: Readonly<EquipmentTableProps> = {
  dataSource: [equipmentListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
  onRow: jest.fn(),
}

export enum TestIdsEnum {
  EquipmentTable = 'equipment-table',
}
