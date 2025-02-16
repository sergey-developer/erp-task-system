import { RelocationEquipmentSimplifiedEditableTableProps } from 'features/relocationEquipments/components/RelocationEquipmentSimplifiedEditableTable/types'

export const props: RelocationEquipmentSimplifiedEditableTableProps = {
  name: '',
  isLoading: false,

  editableKeys: undefined,
  setEditableKeys: jest.fn(),

  equipmentIsLoading: false,
  equipmentListIsLoading: false,

  equipments: [],
  equipmentsIsLoading: false,

  canCreateEquipment: false,
  onClickCreateEquipment: jest.fn(),

  onClickCreateImage: jest.fn(),
}

export enum TestIdsEnum {
  RelocationEquipmentSimplifiedEditableTableContainer = 'relocation-equipment-simplified-editable-table-container',
}
