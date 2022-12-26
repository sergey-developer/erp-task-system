import { UserRolesEnum } from 'shared/constants/roles'

export type JwtPayload = {
  userId: number
  userRole: UserRolesEnum
}

export type AuthenticatedUser = JwtPayload
