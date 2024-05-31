import { FC, ReactElement } from 'react'

import { UserPermissionsEnum } from 'modules/user/constants'
import { useUserPermissions } from 'modules/user/hooks'
import { MatchedUserPermissions } from 'modules/user/utils'

import { MaybeNull } from 'shared/types/utils'

type MatchUserPermissionsProps = {
  expectedPermissions: UserPermissionsEnum[]
  children: (props: { permissions: MatchedUserPermissions }) => MaybeNull<ReactElement>
}

const MatchUserPermissions: FC<MatchUserPermissionsProps> = ({ children, expectedPermissions }) => {
  const permissions = useUserPermissions(expectedPermissions)
  return permissions ? children({ permissions }) : null
}

export default MatchUserPermissions
