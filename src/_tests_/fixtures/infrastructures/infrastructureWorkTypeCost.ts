import { InfrastructureOrderFormWorkTypeCostDTO } from 'features/infrastructures/api/dto/infrastructureOrderFormWorkTypeCost.dto'

import { fakeInteger } from '_tests_/utils'

import { infrastructureWorkType } from './infrastructureWorkType'

export const infrastructureWorkTypeCost = (): InfrastructureOrderFormWorkTypeCostDTO => ({
  type: infrastructureWorkType(),
  cost: fakeInteger(),
})
