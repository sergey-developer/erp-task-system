import { InfrastructureStatusEnum } from 'features/infrastructures/api/constants'
import { UserModel } from 'features/user/models'

import { IdType } from 'shared/types/common'

export type InfrastructureStatusHistoryItemDTO = {
  id: IdType
  status: InfrastructureStatusEnum
  createdAt: string
  createdBy: Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>
}

export type InfrastructureStatusHistoryDTO = InfrastructureStatusHistoryItemDTO[]
