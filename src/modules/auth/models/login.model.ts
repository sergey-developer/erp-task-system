export type LoginResponseModel = {
  access: string
  refresh: string
}

export type LoginMutationArgsModel = {
  email: string
  password: string
}
