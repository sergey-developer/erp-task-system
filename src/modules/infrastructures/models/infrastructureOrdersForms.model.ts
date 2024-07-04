import { IdType } from 'shared/types/common'

import { UrgencyRateTypeModel } from './urgencyRateType.model'

export type InfrastructureOrderFormListItemModel = {
  id: IdType
  number: string
  urgencyRateType: UrgencyRateTypeModel
}

export type InfrastructureOrdersFormsModel = InfrastructureOrderFormListItemModel[]
