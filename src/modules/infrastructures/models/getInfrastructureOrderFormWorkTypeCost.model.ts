import { InfrastructureOrderFormWorkTypeCostModel } from 'modules/infrastructures/models/infrastructureOrderFormWorkTypeCost.model'

import { IdType } from 'shared/types/common'

export type GetInfrastructureOrderFormWorkTypeCostQueryArgs = {
  orderForm: IdType
  workType: IdType
}

export type GetInfrastructureOrderFormWorkTypeCostSuccessResponse =
  InfrastructureOrderFormWorkTypeCostModel
