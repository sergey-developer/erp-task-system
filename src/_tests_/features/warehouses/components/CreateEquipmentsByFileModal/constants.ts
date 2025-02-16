import { CreateEquipmentsByFileModalProps } from 'features/equipments/components/CreateEquipmentsByFileModal/index'

export const props: CreateEquipmentsByFileModalProps = {
  open: true,
  data: [],
  errors: undefined,

  onCreate: jest.fn(),
  isCreating: false,

  onEdit: jest.fn(),

  onCancel: jest.fn(),
}

export enum TestIdsEnum {
  CreateEquipmentsByFileModal = 'create-equipments-by-file-modal',
}
