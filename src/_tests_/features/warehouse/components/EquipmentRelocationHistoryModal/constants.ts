import { EquipmentRelocationHistoryModalProps } from 'features/warehouse/components/EquipmentRelocationHistoryModal/types'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const equipmentRelocationHistoryItem = warehouseFixtures.equipmentRelocationHistoryItem()

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
