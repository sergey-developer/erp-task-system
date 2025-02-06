import { InfrastructureWorkDTO } from 'features/infrastructures/api/dto/infrastructureWork.dto'
import { InfrastructureWorkRequestArgs } from 'features/infrastructures/types'

import { IdType } from 'shared/types/common'

export type UpdateInfrastructureOrderFormWorkMutationArgs = InfrastructureWorkRequestArgs & {
  amount: number
  infrastructureWorkType: IdType
}

export type UpdateInfrastructureOrderFormWorkSuccessResponse = InfrastructureWorkDTO
