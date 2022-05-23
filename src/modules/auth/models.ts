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

export enum RoleEnum {
  Admin = 'ADMIN',
  FirstLineSupport = 'FIRST_LINE_SUPPORT',
  Engineer = 'ENGINEER',
  SeniorEngineer = 'SENIOR_ENGINEER',
  HeadOFDepartment = 'HEAD_OF_DEPARTMENT',
}

export type UserInfo = {
  userId: number
  userRole: RoleEnum
}
