import { InfrastructureWorkDTO } from 'features/infrastructures/api/dto/infrastructureWork.dto'

import { IdType } from 'shared/types/common'

export type CreateInfrastructureOrderFormWorkMutationArgs = {
  amount: number
  infrastructureWorkType: IdType
  orderForm: IdType
}

export type CreateInfrastructureOrderFormWorkSuccessResponse = InfrastructureWorkDTO
