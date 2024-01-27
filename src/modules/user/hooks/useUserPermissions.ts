import { useMemo } from 'react'

import { useAuthUser } from 'modules/auth/hooks'

import { PermissionsMap, UserPermissionConfig } from 'shared/types/permissions'
import { getPermissionsMap } from 'shared/utils/permissions'

export const useUserPermissions = (config: UserPermissionConfig): PermissionsMap => {
  const authUser = useAuthUser()

  return useMemo(() => {
    const permissions = authUser ? config[authUser.role] : []
    return getPermissionsMap(permissions)
  }, [config, authUser])
}
