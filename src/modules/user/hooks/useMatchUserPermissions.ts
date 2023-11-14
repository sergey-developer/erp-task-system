import { UserPermissions } from 'modules/user/models'
import { matchExpectedPermissions, MatchExpectedPermissionsResult } from 'modules/user/utils'

import { MaybeNull } from 'shared/types/utils'

import { useUserMeState } from './useUserMeState'

export const useMatchUserPermissions = (
  expected: UserPermissions[],
): MaybeNull<MatchExpectedPermissionsResult> => {
  const { data: userMe } = useUserMeState()
  return userMe ? matchExpectedPermissions(userMe, expected) : null
}
