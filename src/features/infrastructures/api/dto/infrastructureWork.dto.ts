import { IdType } from 'shared/types/common'

import { InfrastructureWorkTypeDTO } from './infrastructureWorkType.dto'

export type InfrastructureWorkDTO = {
  id: IdType
  type: Pick<InfrastructureWorkTypeDTO, 'id' | 'title' | 'budgetType'>
  laborCosts: number
  amount: number
  cost: number
  price: number
}
