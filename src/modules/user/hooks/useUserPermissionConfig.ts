import useAuthenticatedUser from 'modules/auth/hooks/useAuthenticatedUser'
import {
  PermissionsMap,
  UserPermissionConfig,
} from 'shared/interfaces/permissions'
import getPermissionsMap from 'shared/utils/permissions/getPermissionsMap'

const useUserPermissionConfig = (
  config: UserPermissionConfig,
): PermissionsMap => {
  const user = useAuthenticatedUser()
  if (!user) return {}

  const permissions = config[user.role] || []
  return getPermissionsMap(permissions)
}

export default useUserPermissionConfig
