import { IdType } from 'shared/types/common'

import { InfrastructureStatusHistoryDTO } from '../dto'

export type GetInfrastructureStatusHistoryRequest = {
  infrastructureProject: IdType
}

export type GetInfrastructureStatusHistoryResponse = InfrastructureStatusHistoryDTO
