import { JwtPayload } from './utils/parseJwt'

export type LoginResponseModel = {
  access: string
  refresh: string
}

export type LoginMutationArgsModel = {
  email: string
  password: string
}

export type LogoutMutationArgsModel = {
  refresh: string
}

export type RefreshTokenResponseModel = {
  access: string
}

export type AuthenticatedUserModel = JwtPayload
