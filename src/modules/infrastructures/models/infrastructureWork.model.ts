import { IdType } from 'shared/types/common'

import { InfrastructureWorkTypeModel } from './infrastructureWorkType.model'

export type InfrastructureWorkModel = {
  id: IdType
  type: Pick<InfrastructureWorkTypeModel, 'id' | 'title' | 'budgetType'>
  laborCosts: number
  amount: number
  cost: number
  price: number
}
