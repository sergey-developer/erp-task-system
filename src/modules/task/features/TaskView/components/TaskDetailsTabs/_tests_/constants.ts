import { generateId, generateWord } from '_tests_/utils'
import { TaskStatusEnum, TaskTypeEnum } from 'modules/task/constants/common'

import { TaskDetailsTabsProps } from '../index'

export const requiredProps: TaskDetailsTabsProps = {
  details: {
    id: generateId(),
    type: TaskTypeEnum.Request,
    description: generateWord(),
    userResolution: generateWord(),
    techResolution: generateWord(),
    status: TaskStatusEnum.New,
    assignee: null,
  },
}
