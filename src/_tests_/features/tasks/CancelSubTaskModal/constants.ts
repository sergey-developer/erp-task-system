import { CancelSubTaskModalProps } from 'modules/task/components/CancelSubTaskModal/types'

export const props: Readonly<CancelSubTaskModalProps> = {
  isLoading: false,
  recordId: null,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}

export enum TestIdsEnum {
  CancelSubTaskModal = 'cancel-sub-task-modal',
  CancelReason = 'cancel-reason',
}
