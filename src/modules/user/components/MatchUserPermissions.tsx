import { FC, ReactElement } from 'react'

import { useMatchUserPermissions } from 'modules/user/hooks'
import { UserPermissions } from 'modules/user/models'
import { MatchedPermissions } from 'modules/user/utils'

import { MaybeNull } from 'shared/types/utils'

type MatchUserPermissionsProps = {
  expectedPermissions: UserPermissions[]
  children: (props: { permissions: MatchedPermissions }) => MaybeNull<ReactElement>
}

const MatchUserPermissions: FC<MatchUserPermissionsProps> = ({ children, expectedPermissions }) => {
  const permissions = useMatchUserPermissions(expectedPermissions)
  return permissions ? children({ permissions }) : null
}

export default MatchUserPermissions
