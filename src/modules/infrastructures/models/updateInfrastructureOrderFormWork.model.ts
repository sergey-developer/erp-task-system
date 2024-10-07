import { InfrastructureWorkModel } from 'modules/infrastructures/models/infrastructureWork.model'

import { IdType } from 'shared/types/common'

export type UpdateInfrastructureOrderFormWorkMutationArgs = {
  amount: number
  infrastructureWorkType: IdType
}

export type UpdateInfrastructureOrderFormWorkSuccessResponse = InfrastructureWorkModel
