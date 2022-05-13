import { MaybeNull } from 'shared/interfaces/utils'

export interface IAuthSliceState {
  user: unknown
  accessToken: MaybeNull<string>
  refreshToken: MaybeNull<string>
  isAuthenticated: boolean
}
