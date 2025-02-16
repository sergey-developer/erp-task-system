import { TaskTypeEnum } from 'features/tasks/api/constants'
import { TaskSecondLineModalProps } from 'features/tasks/components/TaskSecondLineModal/types'

import { fakeId, fakeIdStr } from '_tests_/helpers'

export const props: Readonly<TaskSecondLineModalProps> = {
  permissions: {},
  id: fakeId(),
  type: TaskTypeEnum.Request,
  recordId: fakeIdStr(),
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

export enum TestIdsEnum {
  TaskSecondLineModal = 'task-second-line-modal',
  WorkGroupFormItem = 'work-group-form-item',
  MarkDefaultGroupFormItem = 'mark-default-group-form-item',
  WorkTypeFormItem = 'work-type-form-item',
  CommentFormItem = 'comment-form-item',
}
