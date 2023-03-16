import times from 'lodash/times'

import { SubTaskModel } from 'modules/subTask/models'
import { TaskStatusEnum } from 'modules/task/constants/common'

import { NonNullableObject } from 'shared/interfaces/utils'

import commonFixtures from 'fixtures/common'

import {
  fakeDateString,
  fakeId,
  fakeIdStr,
  fakePhone,
  fakeWord,
} from '_tests_/utils'

export const getSubTask = (
  props?: Partial<Pick<SubTaskModel, 'status'>>,
): NonNullableObject<SubTaskModel> => ({
  id: fakeId(),
  recordId: fakeIdStr(),
  title: fakeWord(),
  status: props?.status || TaskStatusEnum.New,
  supportGroup: commonFixtures.getSupportGroup(),
  createdAt: fakeDateString(),
  description: fakeWord(),
  externalAssigneeName: fakeWord(),
  externalAssigneePhone: fakePhone(),
  olaNextBreachTime: fakeDateString(),
  techResolution: fakeWord(),
  returnReason: fakeWord(),
  cancelReason: fakeWord(),
})

export const getSubTaskList = (
  length: number = 1,
): Array<NonNullableObject<SubTaskModel>> => times(length, () => getSubTask())
