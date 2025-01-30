import { RelocationEquipmentEditableTableProps } from 'features/warehouse/components/RelocationEquipmentEditableTable/types'

export const props: RelocationEquipmentEditableTableProps = {
  name: 'equipments',
  editableKeys: undefined,
  setEditableKeys: jest.fn(),

  isLoading: false,

  equipmentIsLoading: false,
  relocationEquipmentsIsLoading: false,

  currencies: [],
  currenciesIsLoading: false,

  equipments: [],
  equipmentsIsLoading: false,

  canCreateEquipment: false,
  createEquipmentBtnDisabled: false,
  onClickCreateEquipment: jest.fn(),

  onClickCreateImage: jest.fn(),
}

export enum TestIdsEnum {
  RelocationEquipmentEditableTableContainer = 'relocation-equipment-editable-table-container',
}
