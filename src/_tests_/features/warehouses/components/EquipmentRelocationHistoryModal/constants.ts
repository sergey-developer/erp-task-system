import { EquipmentRelocationHistoryModalProps } from 'features/equipments/components/EquipmentRelocationHistoryModal/types'

import equipmentsFixtures from '_tests_/fixtures/api/data/equipments'

export const equipmentRelocationHistoryItem = equipmentsFixtures.equipmentRelocationHistoryItem()

export const props: EquipmentRelocationHistoryModalProps = {
  open: true,
  loading: false,
  dataSource: [equipmentRelocationHistoryItem],
  onCancel: jest.fn(),
  onRow: jest.fn(),
}

export enum TestIdsEnum {
  EquipmentRelocationHistoryModal = 'equipment-relocation-history-modal',
  EquipmentRelocationHistoryTable = 'equipment-relocation-history-table',
}
