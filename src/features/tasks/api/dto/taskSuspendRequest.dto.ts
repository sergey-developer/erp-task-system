import { SuspendRequestStatusEnum } from 'features/tasks/api/constants'
import { BaseUserType } from 'features/users/api/types'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskSuspendRequestDTO = {
  id: IdType
  status: SuspendRequestStatusEnum
  comment: string
  author: MaybeNull<Pick<BaseUserType, 'id' | 'firstName' | 'lastName' | 'middleName'>>
  suspendEndAt: string
}
