import { InfrastructureStatusEnum } from 'modules/infrastructures/constants'
import { InfrastructureStatusHistoryItemModel } from 'modules/infrastructures/models'

import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId } from '_tests_/utils'

export const infrastructureStatusHistory = (): InfrastructureStatusHistoryItemModel => ({
  id: fakeId(),
  status: InfrastructureStatusEnum.New,
  createdAt: fakeDateString(),
  createdBy: userFixtures.user(),
})
