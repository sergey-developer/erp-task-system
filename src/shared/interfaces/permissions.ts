import { SubTaskApiPermissionsEnum } from 'modules/subTask/permissions'
import { UserRoleEnum } from 'modules/user/constants/roles'
import {
  CRUDPermissionsEnum,
  UIPermissionsEnum,
} from 'shared/constants/permissions'
import { BooleanMap } from 'shared/interfaces/utils'

export type Permissions =
  | UIPermissionsEnum
  | CRUDPermissionsEnum
  | SubTaskApiPermissionsEnum

export type UserPermissionConfig = Partial<
  Record<UserRoleEnum, Array<Permissions>>
>

export type ObjectPermissionConfig<K extends string> = Record<
  K,
  UserPermissionConfig
>

export type PermissionsMap = Partial<BooleanMap<Uncapitalize<Permissions>>>
