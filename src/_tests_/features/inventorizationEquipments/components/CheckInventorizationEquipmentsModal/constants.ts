import { CheckInventorizationEquipmentsModalProps } from 'modules/warehouse/components/CheckInventorizationEquipmentsModal'

export const props: CheckInventorizationEquipmentsModalProps = {
  open: true,
  data: [],
  isLoading: false,
  onCancel: jest.fn(),
  onClickEdit: jest.fn(),
  onSubmit: jest.fn(),
  editTouchedRowsIds: [],
}

export enum TestIdsEnum {
  Container = 'check-inventorization-equipments-modal',
  IsCreditedBlock = 'is-credited-block',
}
