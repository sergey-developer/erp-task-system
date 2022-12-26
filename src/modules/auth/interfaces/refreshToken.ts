import { RefreshTokenResponseModel } from '../models'
import { JwtPayload } from './common'

export type RefreshTokenActionPayload = RefreshTokenResponseModel & {
  user: JwtPayload
}
