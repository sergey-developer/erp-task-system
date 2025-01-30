import { IdType } from 'shared/types/common'

export type JwtPayload = {
  userId: IdType
}

export type AuthenticatedUser = JwtPayload
