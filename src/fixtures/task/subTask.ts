import times from 'lodash/times'

import {
  generateDateString,
  generateId,
  generateIdStr,
  generatePhone,
  generateWord,
} from '_tests_/utils'
import { SubTaskModel } from 'modules/subTask/models'
import { TaskStatusEnum } from 'modules/task/constants/common'

import { getTaskWorkGroup } from './taskWorkGroup'

export const getSubTask = (): SubTaskModel => ({
  id: generateId(),
  recordId: generateIdStr(),
  title: generateWord(),
  status: TaskStatusEnum.New,
  workGroup: getTaskWorkGroup(),
  createdAt: generateDateString(),
  description: generateWord(),
  externalAssigneeName: generateWord(),
  externalAssigneePhone: generatePhone(),
  olaNextBreachTime: generateDateString(),
  techResolution: generateWord(),
})

export const getSubTaskList = (length: number = 1): Array<SubTaskModel> =>
  times(length, () => getSubTask())
