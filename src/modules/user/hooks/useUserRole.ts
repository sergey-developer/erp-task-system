import { useMemo } from 'react'

import { useAuthenticatedUser } from 'modules/auth/hooks'
import { UserRoleEnum } from 'modules/user/constants'
import { getUserRoleMap } from 'modules/user/utils'

type UseUserRoleResult = ReturnType<typeof getUserRoleMap> & {
  role?: UserRoleEnum
}

export const useUserRole = (): UseUserRoleResult => {
  const user = useAuthenticatedUser()

  return useMemo(() => {
    const role = user?.role

    return {
      role,
      ...getUserRoleMap(role),
    }
  }, [user?.role])
}
