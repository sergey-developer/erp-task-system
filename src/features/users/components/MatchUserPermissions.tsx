import { UserPermissionsEnum } from 'features/users/api/constants'
import { useUserPermissions } from 'features/users/hooks'
import { MatchedUserPermissions } from 'features/users/types'
import { FC, ReactElement } from 'react'

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
