import { InfrastructureWorkModel } from 'features/infrastructures/models/infrastructureWork.model'
import { InfrastructureWorkRequestArgs } from 'features/infrastructures/types'

import { IdType } from 'shared/types/common'

export type UpdateInfrastructureOrderFormWorkMutationArgs = InfrastructureWorkRequestArgs & {
  amount: number
  infrastructureWorkType: IdType
}

export type UpdateInfrastructureOrderFormWorkSuccessResponse = InfrastructureWorkModel
