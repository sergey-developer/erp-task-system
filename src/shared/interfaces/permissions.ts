import { PermissionsEnum } from 'shared/constants/permissions'
import { UserRolesEnum } from 'shared/constants/roles'
import { BooleanMap } from 'shared/interfaces/utils'

export type UserPermissionConfig = Partial<
  Record<UserRolesEnum, Array<PermissionsEnum>>
>

export type ObjectPermissionConfig<K extends string> = Record<
  K,
  UserPermissionConfig
>

export type PermissionsMapKey = Uncapitalize<keyof typeof PermissionsEnum>

export type PermissionsMap = Partial<BooleanMap<PermissionsMapKey>>
