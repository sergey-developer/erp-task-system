import { generateId, generateIdStr, generateWord } from '_tests_/utils'
import { taskFixtures } from 'fixtures/task'
import { TaskStatusEnum, TaskTypeEnum } from 'modules/task/constants/common'

import { SubTaskListTabProps } from '../index'

export const requiredProps: Omit<SubTaskListTabProps, 'description'> = {
  recordId: generateIdStr(),
  title: generateWord(),
  taskId: generateId(),
  assignee: null,
  status: TaskStatusEnum.New,
  type: TaskTypeEnum.Request,
}

export const activeCreateSubTaskButton: Pick<
  SubTaskListTabProps,
  'status' | 'type'
> & { assignee: NonNullable<SubTaskListTabProps['assignee']> } = {
  assignee: taskFixtures.getTaskAssignee(),
  status: TaskStatusEnum.InProgress,
  type: TaskTypeEnum.Request,
}
