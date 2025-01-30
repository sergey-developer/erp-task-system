import { IdType } from 'shared/types/common'

import { InfrastructureStatusHistoryModel } from './infrastructureStatusHistory.model'

export type GetInfrastructureStatusHistoryQueryArgs = {
  infrastructureProject: IdType
}

export type GetInfrastructureStatusHistorySuccessResponse = InfrastructureStatusHistoryModel
