import { useMemo } from 'react'

import { useAuthenticatedUser } from 'modules/auth/hooks'
import { UserRoleEnum } from 'shared/constants/roles'

import { getUserRoleMap } from '../utils'

export const useUserRole = (): ReturnType<typeof getUserRoleMap> & {
  role?: UserRoleEnum
} => {
  const user = useAuthenticatedUser()

  return useMemo(() => {
    const role = user?.role

    return {
      role,
      ...getUserRoleMap(role),
    }
  }, [user?.role])
}
