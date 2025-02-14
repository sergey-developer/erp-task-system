import { InfrastructureWorkDTO } from 'features/infrastructures/api/dto/infrastructureWork.dto'
import { InfrastructureWorkRequestArgs } from 'features/infrastructures/api/types'

import { IdType } from 'shared/types/common'

export type UpdateInfrastructureOrderFormWorkRequest = InfrastructureWorkRequestArgs & {
  amount: number
  infrastructureWorkType: IdType
}

export type UpdateInfrastructureOrderFormWorkResponse = InfrastructureWorkDTO
