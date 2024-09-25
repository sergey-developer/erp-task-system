import { TaskFirstLineModalProps } from 'modules/task/components/TaskFirstLineModal/types'

import { fakeIdStr } from '_tests_/utils/index'

export const props: Readonly<TaskFirstLineModalProps> = {
  recordId: fakeIdStr(),
  isLoading: false,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}

export enum TestIdsEnum {
  ModalTaskFirstLine = 'modal-task-first-line',
  FieldDescription = 'field-description',
}
