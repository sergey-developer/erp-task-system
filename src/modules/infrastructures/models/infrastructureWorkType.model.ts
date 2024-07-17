import { IdType } from 'shared/types/common'

import { BudgetTypeEnum } from '../constants'

export type InfrastructureWorkTypeModel = {
  id: IdType
  title: string
  budgetType: BudgetTypeEnum
}
