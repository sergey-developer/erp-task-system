import { FC, ReactElement } from 'react'

import useUserPermissionConfig from 'modules/user/hooks/useUserPermissionConfig'
import {
  PermissionsMap,
  UserPermissionConfig,
} from 'shared/interfaces/permissions'
import { MaybeNull } from 'shared/interfaces/utils'

type PermissionsProps = {
  config: UserPermissionConfig
  children: (permissions: PermissionsMap) => MaybeNull<ReactElement>
}

const Permissions: FC<PermissionsProps> = ({ children, config }) => {
  const permissions = useUserPermissionConfig(config)
  return children(permissions)
}

export default Permissions
