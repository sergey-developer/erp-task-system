import { IdType } from 'shared/types/common'

import { InfrastructureStatusHistoryDTO } from '../dto/infrastructureStatusHistory.dto'

export type GetInfrastructureStatusHistoryQueryArgs = {
  infrastructureProject: IdType
}

export type GetInfrastructureStatusHistorySuccessResponse = InfrastructureStatusHistoryDTO
