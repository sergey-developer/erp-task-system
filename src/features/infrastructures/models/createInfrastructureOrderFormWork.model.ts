import { InfrastructureWorkModel } from 'features/infrastructures/models/infrastructureWork.model'

import { IdType } from 'shared/types/common'

export type CreateInfrastructureOrderFormWorkMutationArgs = {
  amount: number
  infrastructureWorkType: IdType
  orderForm: IdType
}

export type CreateInfrastructureOrderFormWorkSuccessResponse = InfrastructureWorkModel
