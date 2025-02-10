import { UserPermissionsEnum } from 'features/user/api/constants'
import { getPermissionsObj } from 'features/user/utils'

import { MatchedUserPermissions } from '../types'
import { useUserMeState } from './useUserMeState'

export const useUserPermissions = (permissions: UserPermissionsEnum[]): MatchedUserPermissions => {
  const { data: userMe } = useUserMeState()

  if (userMe) {
    return getPermissionsObj(userMe, permissions)
  } else {
    throw new Error('User permissions must be loaded before using the hook')
  }
}
