import { UserGroupCategoryEnum } from '../constants'
import { UsersGroupsDTO } from '../dto'

export type GetUsersGroupsRequest = Partial<{
  category: UserGroupCategoryEnum
}>

export type GetUsersGroupsResponse = UsersGroupsDTO
