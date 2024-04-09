import { UserPermissionsEnum } from 'modules/user/constants'
import { getPermissionsObj, MatchedPermissions } from 'modules/user/utils'

import { MaybeNull } from 'shared/types/utils'

import { useUserMeState } from './useUserMeState'

export const useMatchUserPermissions = (
  permissions: UserPermissionsEnum[],
): MaybeNull<MatchedPermissions> => {
  const { data: userMe } = useUserMeState()
  return userMe ? getPermissionsObj(userMe, permissions) : null
}
