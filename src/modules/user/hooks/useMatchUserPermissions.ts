import { UserPermissions } from 'modules/user/models'
import { getPermissionsObj, MatchedPermissions } from 'modules/user/utils'

import { MaybeNull } from 'shared/types/utils'

import { useUserMeState } from './useUserMeState'

export const useMatchUserPermissions = (
  permissions: UserPermissions[],
): MaybeNull<MatchedPermissions> => {
  const { data: userMe } = useUserMeState()
  return userMe ? getPermissionsObj(userMe, permissions) : null
}
