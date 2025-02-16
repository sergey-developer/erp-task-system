import { InfrastructureStatusEnum } from 'features/infrastructures/api/constants'
import { InfrastructureStatusHistoryItemDTO } from 'features/infrastructures/api/dto'

import userFixtures from '_tests_/fixtures/users'
import { fakeDateString, fakeId } from '_tests_/helpers'

export const infrastructureStatusHistoryItem = (): InfrastructureStatusHistoryItemDTO => ({
  id: fakeId(),
  status: InfrastructureStatusEnum.New,
  createdAt: fakeDateString(),
  createdBy: userFixtures.userDetail(),
})
