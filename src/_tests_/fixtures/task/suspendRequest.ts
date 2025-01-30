import { SuspendRequestStatusEnum } from 'features/task/constants/taskSuspendRequest'
import { SuspendRequestModel } from 'features/task/models'

import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const suspendRequest = (
  props?: Pick<SuspendRequestModel, 'status'>,
): SuspendRequestModel => ({
  status: props?.status || SuspendRequestStatusEnum.Denied,

  id: fakeId(),
  comment: fakeWord(),
  suspendEndAt: fakeDateString(),
  author: userFixtures.baseUser(),
})
