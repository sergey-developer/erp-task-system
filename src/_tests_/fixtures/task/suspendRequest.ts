import { SuspendRequestStatusEnum } from 'modules/task/constants'
import { SuspendRequestModel } from 'modules/task/models'

import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const suspendRequest = (
  props?: Pick<SuspendRequestModel, 'status'>,
): SuspendRequestModel => ({
  status: props?.status || SuspendRequestStatusEnum.New,

  id: fakeId(),
  comment: fakeWord(),
  suspendEndAt: fakeDateString(),
  author: userFixtures.baseUser(),
})
