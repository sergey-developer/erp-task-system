import { FC, ReactElement } from 'react'

import { useUserPermissions } from 'modules/user/hooks'

import {
  PermissionsMap,
  UserPermissionConfig,
} from 'shared/types/permissions'
import { MaybeNull } from 'shared/types/utils'

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
  hideWhenViewForbidden: true,
}

export default Permissions
