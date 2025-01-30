import { RelocationEquipmentDraftEditableTableProps } from 'features/warehouse/components/RelocationEquipmentDraftEditableTable/types'

export const props: RelocationEquipmentDraftEditableTableProps = {
  name: 'equipments',
  editableKeys: undefined,
  setEditableKeys: jest.fn(),

  isLoading: false,

  currencies: [],
  currenciesIsLoading: false,

  equipments: [],
  equipmentsIsLoading: false,
  onChangeEquipment: jest.fn(),

  equipmentIsLoading: false,

  onClickCreateImage: jest.fn(),
}

export enum TestIdsEnum {
  RelocationEquipmentDraftEditableTableContainer = 'relocation-equipment-draft-editable-table-container',
  EquipmentFormItem = 'equipment-form-item',
  SerialNumberFormItem = 'serial-number-form-item',
  ConditionFormItem = 'condition-form-item',
  PriceFormItem = 'price-form-item',
  CurrencyFormItem = 'currency-form-item',
  QuantityFormItem = 'quantity-form-item',
  AttachmentsFormItem = 'attachments-form-item',
}
