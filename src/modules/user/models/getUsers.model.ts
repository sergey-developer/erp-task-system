import { IdType } from 'shared/types/common'
import { MaybeApiNone } from 'shared/types/utils'

import { UsersModel } from './users.model'

export type GetUsersQueryArgs = Partial<{
  manager: IdType
  isManager: boolean
  allHierarchySubordinates: boolean
  warehouses: IdType[]
  readTasksWorkGroup: MaybeApiNone<IdType>
  resolveTasksWorkGroup: MaybeApiNone<IdType>
}>

export type GetUsersSuccessResponse = UsersModel
