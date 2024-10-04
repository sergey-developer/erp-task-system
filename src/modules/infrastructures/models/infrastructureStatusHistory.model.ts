import { InfrastructureStatusEnum } from 'modules/infrastructures/constants/enums'

import { IdType } from 'shared/types/common'

import { UserModel } from '../../user/models'

export type InfrastructureStatusHistoryItemModel = {
  id: IdType
  status: InfrastructureStatusEnum
  createdAt: string
  createdBy: Pick<UserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>
}

export type InfrastructureStatusHistoryModel = InfrastructureStatusHistoryItemModel[]
