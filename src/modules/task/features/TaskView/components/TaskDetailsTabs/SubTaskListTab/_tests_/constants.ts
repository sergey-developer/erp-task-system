import { taskFixtures } from 'fixtures/task'
import { TaskStatusEnum, TaskTypeEnum } from 'modules/task/constants/common'

import { SubTaskListTabProps } from '../index'

export const requiredProps: Pick<SubTaskListTabProps, 'task'> = {
  task: taskFixtures.getTask(),
}

export const activeCreateSubTaskButtonProps: Pick<SubTaskListTabProps, 'task'> =
  {
    task: taskFixtures.getTask({
      assignee: taskFixtures.getTaskAssignee(),
      status: TaskStatusEnum.InProgress,
      type: TaskTypeEnum.Request,
    }),
  }
