import { RefreshTokenSuccessResponse } from '../models'
import { JwtPayload } from './common'

export type RefreshTokenActionPayload = RefreshTokenSuccessResponse & {
  user: JwtPayload
}
