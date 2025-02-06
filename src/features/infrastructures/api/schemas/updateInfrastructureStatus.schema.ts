import { IdType } from 'shared/types/common'

import { InfrastructureStatusEnum } from '../../constants'

export type UpdateInfrastructureStatusMutationArgs = {
  status: InfrastructureStatusEnum
  infrastructureProject: IdType
}

export type UpdateInfrastructureStatusSuccessResponse = {
  id: IdType
  status: InfrastructureStatusEnum
  changedAt: string
}
