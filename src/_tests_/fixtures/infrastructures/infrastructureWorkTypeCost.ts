import { InfrastructureOrderFormWorkTypeCostModel } from 'features/infrastructures/models/infrastructureOrderFormWorkTypeCost.model'

import { fakeInteger } from '_tests_/utils'

import { infrastructureWorkType } from './infrastructureWorkType'

export const infrastructureWorkTypeCost = (): InfrastructureOrderFormWorkTypeCostModel => ({
  type: infrastructureWorkType(),
  cost: fakeInteger(),
})
