import { InfrastructureOrderFormWorkTypeCostDTO } from 'features/infrastructures/api/dto/infrastructureOrderFormWorkTypeCost.dto'

import { IdType } from 'shared/types/common'

export type GetInfrastructureOrderFormWorkTypeCostRequest = {
  orderForm: IdType
  workType: IdType
}

export type GetInfrastructureOrderFormWorkTypeCostResponse = InfrastructureOrderFormWorkTypeCostDTO
