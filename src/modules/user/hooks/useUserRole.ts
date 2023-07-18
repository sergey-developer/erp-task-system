import { useMemo } from 'react'

import { useAuthenticatedUser } from 'modules/auth/hooks'
import { UserRoleEnum } from 'modules/user/constants/roles'
import { getUserRoleMap } from 'modules/user/utils'

export type UseUserRoleReturnType = ReturnType<typeof getUserRoleMap> & {
  role?: UserRoleEnum
}

export const useUserRole = (): UseUserRoleReturnType => {
  const user = useAuthenticatedUser()

  return useMemo(() => {
    const role = user?.role

    return {
      role,
      ...getUserRoleMap(role),
    }
  }, [user?.role])
}
