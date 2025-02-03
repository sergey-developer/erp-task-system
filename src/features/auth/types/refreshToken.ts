import { RefreshTokenSuccessResponse } from '../schemas'
import { JwtPayload } from './common'

export type RefreshTokenActionPayload = RefreshTokenSuccessResponse & {
  user: JwtPayload
}
