import { IdType } from 'shared/types/common'

import { InfrastructureStatusEnum } from '../constants'

export type UpdateInfrastructureStatusRequest = {
  status: InfrastructureStatusEnum
  infrastructureProject: IdType
}

export type UpdateInfrastructureStatusResponse = {
  id: IdType
  status: InfrastructureStatusEnum
  changedAt: string
}
