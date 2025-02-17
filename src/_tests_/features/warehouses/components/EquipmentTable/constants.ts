import { EquipmentTableProps } from 'features/equipments/components/EquipmentTable/types'

import equipmentsFixtures from '_tests_/fixtures/api/data/equipments'

export const equipmentListItem = equipmentsFixtures.equipment()

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
