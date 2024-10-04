import { InfrastructureWorkModel } from 'modules/infrastructures/models/infrastructureWork.model'

import { IdType } from 'shared/types/common'

export type CreateInfrastructureOrderFormWorksMutationArgs = {
  amount: number
  infrastructureWorkType: IdType
  orderForm: IdType
}

export type CreateInfrastructureOrderFormWorksSuccessResponse = InfrastructureWorkModel
