import { useMemo } from 'react'

import { useAuthenticatedUser } from 'modules/auth/hooks'
import { UserRolesEnum } from 'shared/constants/roles'

import { getUserRole } from '../utils'

export const useUserRole = (): ReturnType<typeof getUserRole> & {
  role?: UserRolesEnum
} => {
  const user = useAuthenticatedUser()

  return useMemo(() => {
    const role = user?.role

    return {
      role,
      ...getUserRole(role),
    }
  }, [user?.role])
}
