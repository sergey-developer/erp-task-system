import { SuspendRequestStatusEnum } from 'modules/task/constants'
import { BaseUserModel } from 'modules/user/models'

import { MaybeNull } from 'shared/types/utils'

export type SuspendRequestModel = {
  id: number
  status: SuspendRequestStatusEnum
  comment: string
  author: MaybeNull<Omit<BaseUserModel, 'avatar'>>
  suspendEndAt: string
}
