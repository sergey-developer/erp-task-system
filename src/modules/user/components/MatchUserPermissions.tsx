import { FC, ReactElement } from 'react'

import { useUserMeState } from 'modules/user/hooks'
import { UserPermissions } from 'modules/user/models'
import {
  matchUserPermissions,
  MatchedUserPermissions,
} from 'modules/user/utils'

type MatchUserPermissionsProps = {
  expected: UserPermissions[]
  children: (props: { permissions: MatchedUserPermissions }) => ReactElement
}

const MatchUserPermissions: FC<MatchUserPermissionsProps> = ({
  children,
  expected,
}) => {
  const { data: userMe } = useUserMeState()
  const permissions = matchUserPermissions(userMe?.permissions || [], expected)

  return userMe ? children({ permissions }) : null
}

export default MatchUserPermissions
