import { IdType } from 'shared/types/common'

import { InfrastructureStatusHistoryDTO } from '../dto/infrastructureStatusHistory.dto'

export type GetInfrastructureStatusHistoryRequest = {
  infrastructureProject: IdType
}

export type GetInfrastructureStatusHistoryResponse = InfrastructureStatusHistoryDTO
