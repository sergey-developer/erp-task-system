import { SuspendRequestStatusEnum } from 'modules/task/constants/common'
import { SuspendRequestModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'

import { generateDateString, generateId, generateWord } from '_tests_/utils'

export const getSuspendRequest = (
  props?: Pick<SuspendRequestModel, 'status'>,
): SuspendRequestModel => ({
  id: generateId(),
  status: props?.status || SuspendRequestStatusEnum.New,
  comment: generateWord(),
  suspendEndAt: generateDateString(),
  author: commonFixtures.getUser(),
})
