import { generateId, generateIdStr, generateWord } from '_tests_/utils'
import taskFixtures from 'fixtures/task'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'

import { TaskCardTabsProps } from '../index'

export const requiredProps: TaskCardTabsProps = {
  task: {
    id: generateId(),
    type: TaskTypeEnum.Request,
    title: generateWord(),
    description: generateWord(),
    userResolution: generateWord(),
    techResolution: generateWord(),
    status: TaskStatusEnum.New,
    extendedStatus: TaskExtendedStatusEnum.New,
    recordId: generateIdStr(),
    suspendRequest: taskFixtures.getSuspendRequest(),
    assignee: null,
  },
}
