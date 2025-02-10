import { FC, ReactElement } from 'react'

import { UserPermissionsEnum } from 'features/user/api/constants'
import { useUserPermissions } from 'features/user/hooks'
import { MatchedUserPermissions } from 'features/user/types'

import { MaybeNull } from 'shared/types/utils'

type MatchUserPermissionsProps = {
  expectedPermissions: UserPermissionsEnum[]
  children: (props: { permissions: MatchedUserPermissions }) => MaybeNull<ReactElement>
}

const MatchUserPermissions: FC<MatchUserPermissionsProps> = ({ children, expectedPermissions }) => {
  const permissions = useUserPermissions(expectedPermissions)
  return children({ permissions })
}

export default MatchUserPermissions
