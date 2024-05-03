import { UserPermissionsEnum } from 'modules/user/constants'
import { getPermissionsObj, MatchedPermissions } from 'modules/user/utils'

import { useUserMeState } from './useUserMeState'

export const useMatchUserPermissions = (permissions: UserPermissionsEnum[]): MatchedPermissions => {
  const { data: userMe } = useUserMeState()

  if (userMe) {
    return getPermissionsObj(userMe, permissions)
  } else {
    throw new Error('Hook should be used after current user loading finished')
  }
}
