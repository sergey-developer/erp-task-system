import { InfrastructureWorkDTO } from 'features/infrastructures/api/dto/infrastructureWork.dto'
import { RequestWithInfrastructureWork } from 'features/infrastructures/api/types'

import { IdType } from 'shared/types/common'

export type UpdateInfrastructureOrderFormWorkRequest = RequestWithInfrastructureWork & {
  amount: number
  infrastructureWorkType: IdType
}

export type UpdateInfrastructureOrderFormWorkResponse = InfrastructureWorkDTO
