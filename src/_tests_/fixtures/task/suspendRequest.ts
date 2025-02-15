import { TaskSuspendRequestDTO } from 'features/tasks/api/dto'
import { SuspendRequestStatusEnum } from 'features/tasks/constants/taskSuspendRequest'

import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const suspendRequest = (
  props?: Pick<TaskSuspendRequestDTO, 'status'>,
): TaskSuspendRequestDTO => ({
  status: props?.status || SuspendRequestStatusEnum.Denied,

  id: fakeId(),
  comment: fakeWord(),
  suspendEndAt: fakeDateString(),
  author: userFixtures.baseUser(),
})
