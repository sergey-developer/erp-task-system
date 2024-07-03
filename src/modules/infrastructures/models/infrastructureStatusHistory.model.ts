import { InfrastructureStatusEnum } from 'modules/infrastructures/constants/enums'

import { IdType } from 'shared/types/common'

export type InfrastructureStatusHistoryModel = {
  id: IdType
  status: InfrastructureStatusEnum
  createdAt: string
}
