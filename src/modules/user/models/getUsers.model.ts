import { IdType } from 'shared/types/common'
import { MaybeNullStr } from 'shared/types/utils'

import { UsersModel } from './users.model'

export type GetUsersQueryArgs = Partial<{
  manager: IdType
  isManager: boolean
  allHierarchySubordinates: boolean
  warehouses: IdType[]
  readTasksWorkGroup: MaybeNullStr<IdType>
  resolveTasksWorkGroup: MaybeNullStr<IdType>
}>

export type GetUsersSuccessResponse = UsersModel
