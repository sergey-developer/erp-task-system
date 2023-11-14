import { camelizeKeys } from 'humps'

import { UserModel, UserPermissions } from 'modules/user/models'

import { Camelize, Writeable } from 'shared/types/utils'

export type MatchExpectedPermissionsResult = Readonly<
  Camelize<Partial<Record<Lowercase<UserPermissions>, boolean>>>
>

export const matchExpectedPermissions = (
  user: UserModel,
  expectedPermissions: UserModel['permissions'],
): MatchExpectedPermissionsResult =>
  camelizeKeys(
    expectedPermissions.reduce<Writeable<MatchExpectedPermissionsResult>>((acc, perm) => {
      const key = perm.toLowerCase() as keyof MatchExpectedPermissionsResult
      acc[key] = user.permissions.includes(perm)
      return acc
    }, {}),
  )

export const checkEveryPermissionAllowed = (permissions: MatchExpectedPermissionsResult): boolean =>
  Object.values(permissions).every(Boolean)

export const expectedPermissionsAllowed = (
  user: UserModel,
  expectedPermissions: UserModel['permissions'],
) => checkEveryPermissionAllowed(matchExpectedPermissions(user, expectedPermissions))
