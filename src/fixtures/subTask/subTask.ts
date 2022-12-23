import times from 'lodash/times'

import {
  generateDateString,
  generateId,
  generateIdStr,
  generatePhone,
  generateWord,
} from '_tests_/utils'
import taskFixtures from 'fixtures/task'
import { SubTaskModel } from 'modules/subTask/models'
import { TaskStatusEnum } from 'modules/task/constants/common'
import { NonNullableObject } from 'shared/interfaces/utils'

export const getSubTask = (
  props?: Partial<Pick<SubTaskModel, 'status'>>,
): NonNullableObject<SubTaskModel> => ({
  id: generateId(),
  recordId: generateIdStr(),
  title: generateWord(),
  status: props?.status || TaskStatusEnum.New,
  workGroup: taskFixtures.getTaskWorkGroup(),
  createdAt: generateDateString(),
  description: generateWord(),
  externalAssigneeName: generateWord(),
  externalAssigneePhone: generatePhone(),
  olaNextBreachTime: generateDateString(),
  techResolution: generateWord(),
})

export const getSubTaskList = (
  length: number = 1,
): Array<NonNullableObject<SubTaskModel>> => times(length, () => getSubTask())
