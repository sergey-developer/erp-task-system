import { ReworkSubTaskModalProps } from 'features/tasks/components/ReworkSubTaskModal/types'

export const props: Readonly<ReworkSubTaskModalProps> = {
  isLoading: false,
  recordId: null,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}

export enum TestIdsEnum {
  ReworkSubTaskModal = 'rework-sub-task-modal',
  ReturnReason = 'return-reason',
}
