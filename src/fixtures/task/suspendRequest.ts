import { SuspendRequestStatusEnum } from 'modules/task/constants/common'
import { SuspendRequestModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'

import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const fakeSuspendRequest = (
  props?: Pick<SuspendRequestModel, 'status'>,
): SuspendRequestModel => ({
  status: props?.status || SuspendRequestStatusEnum.New,

  id: fakeId(),
  comment: fakeWord(),
  suspendEndAt: fakeDateString(),
  author: commonFixtures.fakeUser(),
})
