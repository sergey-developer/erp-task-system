import { camelizeKeys } from 'humps'

import { UserModel, UserPermissions } from 'modules/user/models'

import { Camelize } from 'shared/types/utils'

export type MatchedUserPermissions = Camelize<
  Partial<Record<Lowercase<UserPermissions>, boolean>>
>

export const matchUserPermissions = (
  permissions: UserModel['permissions'],
  expectedPermissions: UserModel['permissions'],
): MatchedUserPermissions =>
  camelizeKeys(
    expectedPermissions.reduce<MatchedUserPermissions>((acc, perm) => {
      const key = perm.toLowerCase() as keyof MatchedUserPermissions
      acc[key] = permissions.includes(perm)
      return acc
    }, {}),
  )
