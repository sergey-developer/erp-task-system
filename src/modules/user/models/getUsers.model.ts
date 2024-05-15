import { IdType } from 'shared/types/common'

import { UsersModel } from './users.model'

export type GetUsersQueryArgs = Partial<{
  manager: IdType
  isManager: boolean
  allHierarchySubordinates: boolean
  warehouses: IdType[]
}>

export type GetUsersSuccessResponse = UsersModel
