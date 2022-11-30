import { generateId, generateIdStr, generateWord } from '_tests_/utils'
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

export const notRequiredProps: Omit<
  SubTaskListTabProps,
  keyof typeof requiredProps
> = {
  description: generateWord(),
}
