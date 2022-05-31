import { useMemo } from 'react'

import useSelector from 'shared/hooks/useSelector'
import { MaybeNull } from 'shared/interfaces/utils'

import { UserInfo } from '../models'
import { authenticatedUserSelector } from '../selectors'

type UseUserInfoReturnType = MaybeNull<{
  id: UserInfo['userId']
  role: UserInfo['userRole']
}>

const useAuthenticatedUser = (): UseUserInfoReturnType => {
  const authenticatedUser = useSelector(authenticatedUserSelector)

  return useMemo(() => {
    return authenticatedUser
      ? { role: authenticatedUser.userRole, id: authenticatedUser.userId }
      : null
  }, [authenticatedUser])
}

export default useAuthenticatedUser
