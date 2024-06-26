import { UserPermissionsEnum } from 'modules/user/constants'
import { getPermissionsObj, MatchedUserPermissions } from 'modules/user/utils'

import { useUserMeState } from './useUserMeState'

export const useMatchUserPermissions = (
  permissions: UserPermissionsEnum[],
): MatchedUserPermissions => {
  const { data: userMe } = useUserMeState()

  if (userMe) {
    return getPermissionsObj(userMe, permissions)
  } else {
    throw new Error('User permissions must be loaded before using the hook')
  }
}
