import { UserRoleEnum } from 'modules/user/constants'

import { CRUDPermissionsEnum, UIPermissionsEnum } from 'shared/constants/permissions'
import { BooleanMap } from 'shared/types/utils'

export type Permissions = UIPermissionsEnum | CRUDPermissionsEnum

export type UserPermissionConfig = Partial<Record<UserRoleEnum, Permissions[]>>

export type ObjectPermissionConfig<K extends string> = Record<K, UserPermissionConfig>

export type PermissionsMap = Partial<BooleanMap<Uncapitalize<Permissions>>>
