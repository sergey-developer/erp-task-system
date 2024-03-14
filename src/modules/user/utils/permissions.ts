import { camelizeKeys } from 'humps'

import { UserModel } from 'modules/user/models'

import { Camelize, Writeable } from 'shared/types/utils'

import { UserPermissionsEnum } from '../constants'

export type MatchedPermissions = Readonly<
  Camelize<Partial<Record<Lowercase<UserPermissionsEnum>, boolean>>>
>

export const getPermissionsObj = (
  user: UserModel,
  permissions: UserPermissionsEnum[],
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

export const checkSomePermissionAllowed = (permissions: MatchedPermissions): boolean =>
  Object.values(permissions).some(Boolean)

export const hasPermissions = (
  user: UserModel,
  permissions: UserModel['permissions'],
  checkEvery: boolean = true,
) => {
  const permissionsObj = getPermissionsObj(user, permissions)
  return checkEvery
    ? checkEveryPermissionAllowed(permissionsObj)
    : checkSomePermissionAllowed(permissionsObj)
}
