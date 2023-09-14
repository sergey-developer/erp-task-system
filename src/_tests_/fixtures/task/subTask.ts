import times from 'lodash/times'

import { TaskStatusEnum } from 'modules/task/constants/task'
import { SubTaskModel } from 'modules/task/models'

import { NonNullableObject } from 'shared/types/utils'

import supportGroupFixtures from '_tests_/fixtures/supportGroup'
import { fakeDateString, fakeId, fakeIdStr, fakePhone, fakeWord } from '_tests_/utils'

export const subTask = (
  props?: Partial<Pick<SubTaskModel, 'status'>>,
): NonNullableObject<SubTaskModel> => ({
  status: props?.status || TaskStatusEnum.New,

  id: fakeId(),
  recordId: fakeIdStr(),
  title: fakeWord(),
  supportGroup: supportGroupFixtures.supportGroup(),
  createdAt: fakeDateString(),
  description: fakeWord(),
  externalAssigneeName: fakeWord(),
  externalAssigneePhone: fakePhone(),
  olaNextBreachTime: fakeDateString(),
  techResolution: fakeWord(),
  returnReason: fakeWord(),
  cancelReason: fakeWord(),
})

export const subTaskList = (length: number = 1): NonNullableObject<SubTaskModel>[] =>
  times(length, () => subTask())
