import { UserRoleEnum } from 'modules/user/constants'

import { IdType } from 'shared/types/common'

export type JwtPayload = {
  userId: IdType
  userRole: UserRoleEnum
}

export type AuthenticatedUser = JwtPayload
