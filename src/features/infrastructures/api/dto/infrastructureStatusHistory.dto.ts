import { InfrastructureStatusEnum } from 'features/infrastructures/api/constants'
import { UserDetailDTO } from 'features/users/api/dto'

import { IdType } from 'shared/types/common'

export type InfrastructureStatusHistoryItemDTO = {
  id: IdType
  status: InfrastructureStatusEnum
  createdAt: string
  createdBy: Pick<UserDetailDTO, 'id' | 'firstName' | 'lastName' | 'middleName'>
}

export type InfrastructureStatusHistoryDTO = InfrastructureStatusHistoryItemDTO[]
