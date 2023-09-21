import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { BaseUserModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type SuspendRequestModel = {
  id: IdType
  status: SuspendRequestStatusEnum
  comment: string
  author: MaybeNull<Pick<BaseUserModel, 'id' | 'firstName' | 'lastName' | 'middleName'>>
  suspendEndAt: string
}
