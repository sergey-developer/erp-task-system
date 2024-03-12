import { camelizeKeys } from 'humps'

import { UserModel, UserPermissions } from 'modules/user/models'

import { Camelize, Writeable } from 'shared/types/utils'

export type MatchedPermissions = Readonly<
  Camelize<Partial<Record<Lowercase<UserPermissions>, boolean>>>
>

export const getPermissionsObj = (
  user: UserModel,
  permissions: UserModel['permissions'],
): MatchedPermissions =>
  camelizeKeys(
    permissions.reduce<Writeable<MatchedPermissions>>((acc, perm) => {
      const key = perm.toLowerCase() as keyof MatchedPermissions
      acc[key] = user.permissions.includes(perm)
      return acc
    }, {}),
  )

export const checkEveryPermissionAllowed = (permissions: MatchedPermissions): boolean =>
  Object.values(permissions).every(Boolean)

export const hasPermissions = (user: UserModel, permissions: UserModel['permissions']) =>
  checkEveryPermissionAllowed(getPermissionsObj(user, permissions))
