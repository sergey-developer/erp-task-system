import { UserPermissionsEnum } from 'features/user/constants'

import { Camelize } from 'shared/types/utils'

export type MatchedUserPermissions = Readonly<
  Camelize<Partial<Record<Lowercase<UserPermissionsEnum>, boolean>>>
>
