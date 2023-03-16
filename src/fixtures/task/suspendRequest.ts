import { SuspendRequestStatusEnum } from 'modules/task/constants/common'
import { SuspendRequestModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'

import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const getSuspendRequest = (
  props?: Pick<SuspendRequestModel, 'status'>,
): SuspendRequestModel => ({
  id: fakeId(),
  status: props?.status || SuspendRequestStatusEnum.New,
  comment: fakeWord(),
  suspendEndAt: fakeDateString(),
  author: commonFixtures.getUser(),
})
