import { CancelRelocationTaskModalProps } from 'features/relocationTasks/components/CancelRelocationTaskModal/index'

export const props: CancelRelocationTaskModalProps = {
  open: true,
  isLoading: false,
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
}

export enum TestIdsEnum {
  CancelRelocationTaskModal = 'cancel-relocation-task-modal',
}
