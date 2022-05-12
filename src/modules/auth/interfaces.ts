export interface IAuthSliceState {
  user: unknown
  access: null | string
  refresh: null | string
  isAuthenticated: boolean
}
