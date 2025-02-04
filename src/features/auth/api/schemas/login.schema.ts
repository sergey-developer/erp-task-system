export type LoginSuccessResponse = {
  access: string
  refresh: string
}

export type LoginMutationArgs = {
  email: string
  password: string
}
