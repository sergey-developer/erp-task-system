import { InfrastructureStatusHistoryItemDTO } from 'features/infrastructures/api/dto'
import { InfrastructureStatusEnum } from 'features/infrastructures/constants'

import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId } from '_tests_/utils'

export const infrastructureStatusHistory = (): InfrastructureStatusHistoryItemDTO => ({
  id: fakeId(),
  status: InfrastructureStatusEnum.New,
  createdAt: fakeDateString(),
  createdBy: userFixtures.user(),
})
