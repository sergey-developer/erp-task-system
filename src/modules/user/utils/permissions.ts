import { camelizeKeys } from 'humps'

import { UserModel, UserPermissions } from 'modules/user/models'

import { Camelize, Writeable } from 'shared/types/utils'

export type MatchExpectedPermissionsResult = Readonly<
  Camelize<Partial<Record<Lowercase<UserPermissions>, boolean>>>
>

export const getPermissionsObj = (
  user: UserModel,
  permissions: UserModel['permissions'],
): MatchExpectedPermissionsResult =>
  camelizeKeys(
    permissions.reduce<Writeable<MatchExpectedPermissionsResult>>((acc, perm) => {
      const key = perm.toLowerCase() as keyof MatchExpectedPermissionsResult
      acc[key] = user.permissions.includes(perm)
      return acc
    }, {}),
  )

export const checkEveryPermissionAllowed = (permissions: MatchExpectedPermissionsResult): boolean =>
  Object.values(permissions).every(Boolean)

export const hasPermissions = (user: UserModel, permissions: UserModel['permissions']) =>
  checkEveryPermissionAllowed(getPermissionsObj(user, permissions))
