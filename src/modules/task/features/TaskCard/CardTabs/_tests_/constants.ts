import { generateId, generateIdStr, generateWord } from '_tests_/utils'
import { TaskStatusEnum, TaskTypeEnum } from 'modules/task/constants/common'

import { TaskCardTabsProps } from '../index'

export const requiredProps: TaskCardTabsProps = {
  details: {
    id: generateId(),
    type: TaskTypeEnum.Request,
    title: generateWord(),
    description: generateWord(),
    userResolution: generateWord(),
    techResolution: generateWord(),
    status: TaskStatusEnum.New,
    recordId: generateIdStr(),
    assignee: null,
  },
}
