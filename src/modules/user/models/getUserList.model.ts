import { MaybeUndefined } from 'shared/types/utils'

import { UserListModel } from './userList.model'

export type GetUserListQueryArgs = MaybeUndefined<
  Partial<{
    isManager: boolean
  }>
>

export type GetUserListSuccessResponse = UserListModel
