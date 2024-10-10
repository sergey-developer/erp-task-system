import { InfrastructureWorkModel } from 'modules/infrastructures/models/infrastructureWork.model'
import { InfrastructureWorkRequestArgs } from 'modules/infrastructures/types'

import { IdType } from 'shared/types/common'

export type UpdateInfrastructureOrderFormWorkMutationArgs = InfrastructureWorkRequestArgs & {
  amount: number
  infrastructureWorkType: IdType
}

export type UpdateInfrastructureOrderFormWorkSuccessResponse = InfrastructureWorkModel
