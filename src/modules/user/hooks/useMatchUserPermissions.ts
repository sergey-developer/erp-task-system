import { UserPermissions } from 'modules/user/models'
import { getPermissionsObj, MatchExpectedPermissionsResult } from 'modules/user/utils'

import { MaybeNull } from 'shared/types/utils'

import { useUserMeState } from './useUserMeState'

export const useMatchUserPermissions = (
  permissions: UserPermissions[],
): MaybeNull<MatchExpectedPermissionsResult> => {
  const { data: userMe } = useUserMeState()
  return userMe ? getPermissionsObj(userMe, permissions) : null
}
