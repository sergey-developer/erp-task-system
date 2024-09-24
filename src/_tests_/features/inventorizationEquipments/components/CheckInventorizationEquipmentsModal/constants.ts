import { CheckInventorizationEquipmentsModalProps } from 'modules/warehouse/components/CheckInventorizationEquipmentsModal'

export const props: CheckInventorizationEquipmentsModalProps = {
  open: true,
  data: [],
  onCancel: jest.fn(),
  onClickEdit: jest.fn(),
  editTouchedRowsIds: [],
}

export enum TestIdsEnum {
  Modal = 'check-inventorization-equipments-modal',
}
