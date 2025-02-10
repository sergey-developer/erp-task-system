import { UserModel } from 'features/user/api/dto'
import { camelizeKeys } from 'humps'

import { Writeable } from 'shared/types/utils'

import { UserPermissionsEnum } from '../api/constants'
import { MatchedUserPermissions } from '../types'

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
