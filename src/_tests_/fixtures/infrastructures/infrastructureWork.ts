import { InfrastructureWorkDTO } from 'features/infrastructures/api/dto'

import { fakeId, fakeInteger } from '_tests_/utils'

import { infrastructureWorkType } from './infrastructureWorkType'

export const infrastructureWork = (): InfrastructureWorkDTO => ({
  id: fakeId(),
  laborCosts: fakeInteger(),
  amount: fakeInteger(),
  cost: fakeInteger(),
  price: fakeInteger(),
  type: infrastructureWorkType(),
})
