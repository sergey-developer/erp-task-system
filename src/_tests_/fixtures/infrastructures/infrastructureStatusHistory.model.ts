import { InfrastructureStatusEnum } from 'modules/infrastructures/constants'
import { InfrastructureStatusHistoryModel } from 'modules/infrastructures/models'

import { fakeDateString, fakeId } from '_tests_/utils'

export const infrastructureStatusHistory = (): InfrastructureStatusHistoryModel => ({
  id: fakeId(),
  status: InfrastructureStatusEnum.New,
  createdAt: fakeDateString(),
})
