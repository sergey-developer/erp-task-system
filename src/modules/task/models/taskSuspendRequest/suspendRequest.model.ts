import { SuspendRequestStatusEnum } from 'modules/task/constants'
import { BaseUserModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'

export type SuspendRequestModel = {
  id: IdType
  status: SuspendRequestStatusEnum
  comment: string
  author: Pick<BaseUserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>
  suspendEndAt: string
}
