import UserRolesEnum from 'shared/constants/roles'

export type LoginApiResponse = {
  access: string
  refresh: string
}

export type LoginApiArg = {
  email: string
  password: string
}

export type UserRefreshCreateApiResponse = {
  access: string
}

export type UserInfo = {
  userId: number
  userRole: UserRolesEnum
}
