import { IdType } from 'shared/types/common'

import { UserPermissionsEnum } from '../constants'
import { UsersModel } from './users.model'

export type GetUsersQueryArgs = Partial<{
  manager: IdType
  isManager: boolean
  allHierarchySubordinates: boolean
  warehouses: IdType[]
  permissions: UserPermissionsEnum[]
}>

export type GetUsersSuccessResponse = UsersModel
