import { camelizeKeys } from 'humps'

import { UserModel } from 'modules/user/models'

import { Camelize, Writeable } from 'shared/types/utils'

import { UserPermissionsEnum } from '../constants'

// todo: вынести в типы user
export type MatchedUserPermissions = Readonly<
  Camelize<Partial<Record<Lowercase<UserPermissionsEnum>, boolean>>>
>

export const getPermissionsObj = (
  user: UserModel,
  permissions: UserPermissionsEnum[],
): MatchedUserPermissions =>
  camelizeKeys(
    permissions.reduce<Writeable<MatchedUserPermissions>>((acc, perm) => {
      const key = perm.toLowerCase() as keyof MatchedUserPermissions
      acc[key] = user.permissions.includes(perm)
      return acc
    }, {}),
  )

export const checkEveryPermissionAllowed = (permissions: MatchedUserPermissions): boolean =>
  Object.values(permissions).every(Boolean)

export const checkSomePermissionAllowed = (permissions: MatchedUserPermissions): boolean =>
  Object.values(permissions).some(Boolean)

export const userHasPermissions = (
  user: UserModel,
  permissions: UserModel['permissions'],
  checkEvery: boolean = true,
) => {
  const permissionsObj = getPermissionsObj(user, permissions)
  return checkEvery
    ? checkEveryPermissionAllowed(permissionsObj)
    : checkSomePermissionAllowed(permissionsObj)
}
