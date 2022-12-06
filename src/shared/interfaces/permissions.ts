import { SubTaskApiPermissionsEnum } from 'modules/task/features/TaskView/permissions'
import {
  CRUDPermissionsEnum,
  UIPermissionsEnum,
} from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { BooleanMap } from 'shared/interfaces/utils'

export type Permissions =
  | UIPermissionsEnum
  | CRUDPermissionsEnum
  | SubTaskApiPermissionsEnum

export type UserPermissionConfig = Partial<
  Record<UserRolesEnum, Array<Permissions>>
>

export type ObjectPermissionConfig<K extends string> = Record<
  K,
  UserPermissionConfig
>

export type PermissionsMap = Partial<BooleanMap<Uncapitalize<Permissions>>>
