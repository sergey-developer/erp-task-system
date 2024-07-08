import { InfrastructureWorkModel } from 'modules/infrastructures/models'

import { fakeId, fakeInteger } from '_tests_/utils'

import { infrastructureWorkType } from './infrastructureWorkType'

export const infrastructureWork = (): InfrastructureWorkModel => ({
  id: fakeId(),
  laborCosts: fakeInteger(),
  amount: fakeInteger(),
  cost: fakeInteger(),
  price: fakeInteger(),
  type: infrastructureWorkType(),
})
