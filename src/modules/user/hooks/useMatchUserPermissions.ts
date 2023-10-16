import { UserPermissions } from 'modules/user/models'
import {
  MatchedUserPermissions,
  matchUserPermissions,
} from 'modules/user/utils'

import { MaybeNull } from 'shared/types/utils'

import { useUserMeState } from './useUserMeState'

export const useMatchUserPermissions = (
  expected: UserPermissions[],
): MaybeNull<MatchedUserPermissions> => {
  const { data: userMe } = useUserMeState()
  return userMe ? matchUserPermissions(userMe.permissions, expected) : null
}
