import { UserListModel } from './userList.model'

export type GetUserListQueryArgs = Partial<{
  isManager: boolean
}>

export type GetUserListSuccessResponse = UserListModel
