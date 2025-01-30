import times from 'lodash/times'

import { TaskStatusEnum } from 'features/task/constants/task'
import { SubTaskModel } from 'features/task/models'

import { SetNonNullable } from 'shared/types/utils'

import supportGroupFixtures from '_tests_/fixtures/supportGroup'
import { fakeDateString, fakeId, fakeIdStr, fakePhone, fakeWord } from '_tests_/utils'

export const subTask = (
  props?: Partial<Pick<SubTaskModel, 'status'>>,
): SetNonNullable<SubTaskModel> => ({
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

export const subTaskList = (length: number = 1): SetNonNullable<SubTaskModel>[] =>
  times(length, () => subTask())
