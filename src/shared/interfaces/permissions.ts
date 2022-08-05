import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { BooleanMap, Keys } from 'shared/interfaces/utils'

export type UserPermissionConfig = Partial<
  Record<UserRolesEnum, Array<PermissionsEnum>>
>

export type ElementPermissionConfig<K extends string> = Record<
  K,
  UserPermissionConfig
>

export type PermissionsMapKey = Uncapitalize<Keys<typeof PermissionsEnum>>

export type PermissionsMap = Partial<BooleanMap<PermissionsMapKey>>
