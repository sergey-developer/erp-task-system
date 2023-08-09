import { UserRoleEnum } from 'modules/user/constants'

export type JwtPayload = {
  userId: number
  userRole: UserRoleEnum
}

export type AuthenticatedUser = JwtPayload
