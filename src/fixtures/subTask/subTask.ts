import times from 'lodash/times'

import {
  generateDateString,
  generateId,
  generateIdStr,
  generatePhone,
  generateWord,
} from '_tests_/utils'
import commonFixtures from 'fixtures/common'
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
  supportGroup: commonFixtures.getSupportGroup(),
  createdAt: generateDateString(),
  description: generateWord(),
  externalAssigneeName: generateWord(),
  externalAssigneePhone: generatePhone(),
  olaNextBreachTime: generateDateString(),
  techResolution: generateWord(),
  returnReason: generateWord(),
  cancelReason: generateWord(),
})

export const getSubTaskList = (
  length: number = 1,
): Array<NonNullableObject<SubTaskModel>> => times(length, () => getSubTask())
