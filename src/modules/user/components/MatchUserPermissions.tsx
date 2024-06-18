import { FC, ReactElement } from 'react'

import { UserPermissionsEnum } from 'modules/user/constants'
import { useUserPermissions } from 'modules/user/hooks'
import { MatchedPermissions } from 'modules/user/utils'

import { MaybeNull } from 'shared/types/utils'

type MatchUserPermissionsProps = {
  expectedPermissions: UserPermissionsEnum[]
  children: (props: { permissions: MatchedPermissions }) => MaybeNull<ReactElement>
}

const MatchUserPermissions: FC<MatchUserPermissionsProps> = ({ children, expectedPermissions }) => {
  const permissions = useUserPermissions(expectedPermissions)
  return children({ permissions })
}

export default MatchUserPermissions
