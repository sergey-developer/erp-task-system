export type LoginResponse = {
  access: string
  refresh: string
}

export type LoginRequest = {
  email: string
  password: string
}
