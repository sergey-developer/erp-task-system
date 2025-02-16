import { TaskStatusEnum } from 'features/tasks/api/constants'
import { SubTaskDTO } from 'features/tasks/api/dto'
import times from 'lodash/times'

import { SetNonNullable } from 'shared/types/utils'

import supportGroupFixtures from '_tests_/fixtures/supportGroups'
import { fakeDateString, fakeId, fakeIdStr, fakePhone, fakeWord } from '_tests_/utils'

export const subTask = (
  props?: Partial<Pick<SubTaskDTO, 'status'>>,
): SetNonNullable<SubTaskDTO> => ({
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

export const subTaskList = (length: number = 1): SetNonNullable<SubTaskDTO>[] =>
  times(length, () => subTask())
