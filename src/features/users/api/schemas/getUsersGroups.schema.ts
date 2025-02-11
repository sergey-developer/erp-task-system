import { UserGroupCategoryEnum } from '../constants'
import { UsersGroupsDTO } from '../dto'

export type GetUsersGroupsQueryArgs = Partial<{
  category: UserGroupCategoryEnum
}>

export type GetUsersGroupsSuccessResponse = UsersGroupsDTO
