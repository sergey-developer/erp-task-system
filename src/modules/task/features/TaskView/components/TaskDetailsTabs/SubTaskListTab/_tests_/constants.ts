import { taskFixtures } from 'fixtures/task'
import { TaskStatusEnum, TaskTypeEnum } from 'modules/task/constants/common'

import { SubTaskListTabProps } from '../index'

export const requiredProps: Pick<SubTaskListTabProps, 'task'> = {
  task: taskFixtures.getTask(),
}

export const activeCreateSubTaskButtonTaskProps: Pick<
  SubTaskListTabProps['task'],
  'assignee' | 'status' | 'type'
> = {
  assignee: taskFixtures.getTaskAssignee(),
  status: TaskStatusEnum.InProgress,
  type: TaskTypeEnum.Request,
}
