import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { UsersModel } from './users.model'

export type GetUsersQueryArgs = Partial<{
  manager: IdType
  isManager: boolean
  allHierarchySubordinates: boolean
  warehouses: IdType[]
  readTasksWorkGroup: MaybeNull<IdType>
  resolveTasksWorkGroup: MaybeNull<IdType>
}>

export type GetUsersSuccessResponse = UsersModel
