import { ConfirmMoveRelocationTaskDraftToWorkModalProps } from 'features/warehouse/components/ConfirmMoveRelocationTaskDraftToWorkModal'

export const props: ConfirmMoveRelocationTaskDraftToWorkModalProps = {
  open: true,
  isLoading: false,
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
}

export enum TestIdsEnum {
  Container = 'confirm-transfer-draft-relocation-task-to-work-modal',
}
