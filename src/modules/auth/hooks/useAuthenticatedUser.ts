import { useMemo } from 'react'

import useSelector from 'shared/hooks/useSelector'
import { MaybeNull } from 'shared/interfaces/utils'

import { AuthenticatedUserModel } from '../models'
import { authenticatedUserSelector } from '../selectors'

type UseAuthenticatedUserReturnType = MaybeNull<{
  id: AuthenticatedUserModel['userId']
  role: AuthenticatedUserModel['userRole']
}>

const useAuthenticatedUser = (): UseAuthenticatedUserReturnType => {
  const authenticatedUser = useSelector(authenticatedUserSelector)

  return useMemo(() => {
    return authenticatedUser
      ? { role: authenticatedUser.userRole, id: authenticatedUser.userId }
      : null
  }, [authenticatedUser])
}

export default useAuthenticatedUser
