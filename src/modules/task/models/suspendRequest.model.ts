import { SuspendRequestStatusEnum } from 'modules/task/constants/common'
import { UserModel } from 'modules/user/models'

export type SuspendRequestModel = {
  id: number
  status: SuspendRequestStatusEnum
  comment: string
  author: Omit<UserModel, 'avatar'>
  suspendEndAt: string
}
