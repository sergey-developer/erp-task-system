import { ConfirmExecutionRelocationTaskModalProps } from 'features/warehouse/components/ConfirmExecutionRelocationTaskModal/index'

export const props: ConfirmExecutionRelocationTaskModalProps = {
  open: true,
  isLoading: false,
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
}

export enum TestIdsEnum {
  ConfirmExecutionRelocationTaskModal = 'confirm-execution-relocation-task-modal',
}
