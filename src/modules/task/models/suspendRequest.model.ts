import { SuspendRequestStatusEnum } from 'modules/task/constants/common'
import { BaseUserModel } from 'modules/user/models'

export type SuspendRequestModel = {
  id: number
  status: SuspendRequestStatusEnum
  comment: string
  author: Omit<BaseUserModel, 'avatar'>
  suspendEndAt: string
}
