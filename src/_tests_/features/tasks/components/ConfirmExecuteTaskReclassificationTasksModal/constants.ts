import { ConfirmExecuteTaskReclassificationTasksModalProps } from 'features/tasks/components/ConfirmExecuteTaskReclassificationTasksModal/index'

import { fakeIdStr } from '_tests_/utils'

export const props: Readonly<ConfirmExecuteTaskReclassificationTasksModalProps> = {
  open: true,
  recordId: fakeIdStr(),
  onCancel: jest.fn(),
  onOk: jest.fn(),
}

export enum TestIdsEnum {
  ConfirmExecuteTaskReclassificationTasksModal = 'confirm-execute-task-reclassification-tasks-modal',
}
