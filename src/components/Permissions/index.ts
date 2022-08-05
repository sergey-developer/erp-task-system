import { FC, ReactElement } from 'react'

import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import {
  PermissionsMap,
  UserPermissionConfig,
} from 'shared/interfaces/permissions'
import { MaybeNull } from 'shared/interfaces/utils'

type PermissionsProps = {
  config: UserPermissionConfig
  children: (permissions: PermissionsMap) => MaybeNull<ReactElement>

  hideWhenViewForbidden?: boolean
}

const Permissions: FC<PermissionsProps> = ({
  children,
  config,
  hideWhenViewForbidden,
}) => {
  const permissions = useUserPermissions(config)
  const shouldHide = !permissions.canView && hideWhenViewForbidden

  return shouldHide ? null : children(permissions)
}

Permissions.defaultProps = {
  hideWhenViewForbidden: false,
}

export default Permissions
