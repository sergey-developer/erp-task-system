import { generateDateString, generateId, generateWord } from '_tests_/utils'
import commonFixtures from 'fixtures/common'
import { SuspendRequestStatusEnum } from 'modules/task/constants/common'
import { SuspendRequestModel } from 'modules/task/models'

export const getSuspendRequest = (
  props?: Pick<SuspendRequestModel, 'status'>,
): SuspendRequestModel => ({
  id: generateId(),
  status: props?.status || SuspendRequestStatusEnum.New,
  comment: generateWord(),
  suspendEndAt: generateDateString(),
  author: commonFixtures.getUser(),
})
