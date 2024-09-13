import { UserGroupCategoryEnum } from '../constants'
import { UsersGroupsModel } from './usersGroups.model'

export type GetUsersGroupsQueryArgs = Partial<{
  category: UserGroupCategoryEnum
}>

export type GetUsersGroupsSuccessResponse = UsersGroupsModel
