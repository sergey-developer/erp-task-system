import { useMemo } from 'react'

import { useAuthUser } from 'modules/auth/hooks'
import { UserRoleEnum } from 'modules/user/constants'
import { getUserRoleMap } from 'modules/user/utils'

type UseUserRoleResult = ReturnType<typeof getUserRoleMap> & {
  role?: UserRoleEnum
}

export const useUserRole = (): UseUserRoleResult => {
  const authUser = useAuthUser()

  return useMemo(() => {
    const role = authUser?.role
    return { role, ...getUserRoleMap(role) }
  }, [authUser?.role])
}
