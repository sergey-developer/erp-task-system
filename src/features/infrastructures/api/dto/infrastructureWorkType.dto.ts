import { IdType } from 'shared/types/common'

import { BudgetTypeEnum } from '../constants'

export type InfrastructureWorkTypeDTO = {
  id: IdType
  title: string
  budgetType: BudgetTypeEnum
  laborCosts: number
}
