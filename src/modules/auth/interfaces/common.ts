import { UserRoleEnum } from 'shared/constants/roles'

export type JwtPayload = {
  userId: number
  userRole: UserRoleEnum
}

export type AuthenticatedUser = JwtPayload
