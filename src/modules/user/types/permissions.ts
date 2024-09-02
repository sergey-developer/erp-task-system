import { UserPermissionsEnum } from 'modules/user/constants'

import { Camelize } from 'shared/types/utils'

export type MatchedUserPermissions = Readonly<
  Camelize<Partial<Record<Lowercase<UserPermissionsEnum>, boolean>>>
>
