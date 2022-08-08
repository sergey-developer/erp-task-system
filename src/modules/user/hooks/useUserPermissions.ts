import { useMemo } from 'react'

import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import {
  PermissionsMap,
  UserPermissionConfig,
} from 'shared/interfaces/permissions'
import getPermissionsMap from 'shared/utils/permissions/getPermissionsMap'

const useUserPermissions = (config: UserPermissionConfig): PermissionsMap => {
  const user = useAuthenticatedUser()

  return useMemo(() => {
    const permissions = user ? config[user.role] : []
    return getPermissionsMap(permissions)
  }, [config, user])
}

export default useUserPermissions
