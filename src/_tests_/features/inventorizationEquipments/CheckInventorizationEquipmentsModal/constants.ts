import { CheckInventorizationEquipmentsModalProps } from 'modules/warehouse/components/CheckInventorizationEquipmentsModal'

export const props: CheckInventorizationEquipmentsModalProps = {
  open: true,
  data: [],
  onCancel: jest.fn(),
}

export enum TestIdsEnum {
  Modal = 'check-inventorization-equipments-modal',
}
