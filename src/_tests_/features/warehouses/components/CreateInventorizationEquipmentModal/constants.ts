import { CreateInventorizationEquipmentModalProps } from 'features/inventorizations/components/CreateInventorizationEquipmentModal/types'

export const props: CreateInventorizationEquipmentModalProps = {
  open: true,
  isLoading: false,

  equipment: undefined,
  equipmentIsLoading: false,
  equipments: [],
  equipmentsIsLoading: false,
  onChangeEquipment: jest.fn(),
  onClickCreateEquipment: jest.fn(),

  warehouses: [],

  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

export enum TestIdsEnum {
  CreateInventorizationEquipmentModal = 'create-inventorization-equipment-modal',
  EquipmentFormItem = 'equipment-form-item',
  EquipmentDropdown = 'equipment-dropdown',
  LocationPlanFormItem = 'location-plan-form-item',
  LocationFactFormItem = 'location-fact-form-item',
}
