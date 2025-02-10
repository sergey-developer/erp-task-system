import { UserModel } from './user.model'

export type UserListItemModel = Pick<UserModel, 'id' | 'fullName'>
export type UsersModel = UserListItemModel[]
