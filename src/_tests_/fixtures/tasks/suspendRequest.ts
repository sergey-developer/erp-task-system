import { SuspendRequestStatusEnum } from 'features/tasks/api/constants'
import { TaskSuspendRequestDTO } from 'features/tasks/api/dto'

import userFixtures from '_tests_/fixtures/users'
import { fakeDateString, fakeId, fakeWord } from '_tests_/helpers'

export const suspendRequest = (
  props?: Pick<TaskSuspendRequestDTO, 'status'>,
): TaskSuspendRequestDTO => ({
  status: props?.status || SuspendRequestStatusEnum.Denied,

  id: fakeId(),
  comment: fakeWord(),
  suspendEndAt: fakeDateString(),
  author: userFixtures.baseUser(),
})
