import times from 'lodash/times'

import { SubTaskModel } from 'modules/subTask/models'
import { TaskStatusEnum } from 'modules/task/constants'

import { NonNullableObject } from 'shared/types/utils'

import commonFixtures from '_tests_/fixtures/common'

import {
  fakeDateString,
  fakeId,
  fakeIdStr,
  fakePhone,
  fakeWord,
} from '_tests_/utils'

export const subTask = (
  props?: Partial<Pick<SubTaskModel, 'status'>>,
): NonNullableObject<SubTaskModel> => ({
  status: props?.status || TaskStatusEnum.New,

  id: fakeId(),
  recordId: fakeIdStr(),
  title: fakeWord(),
  supportGroup: commonFixtures.supportGroup(),
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
): NonNullableObject<SubTaskModel>[] => times(length, () => subTask())
