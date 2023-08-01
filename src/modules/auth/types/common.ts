import { UserRoleEnum } from 'modules/user/constants/roles'

export type JwtPayload = {
  userId: number
  userRole: UserRoleEnum
}

export type AuthenticatedUser = JwtPayload
