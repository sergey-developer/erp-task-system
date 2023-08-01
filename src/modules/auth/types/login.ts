import { LoginSuccessResponse } from '../models'
import { JwtPayload } from './common'

export type LoginActionPayload = LoginSuccessResponse & {
  user: JwtPayload
}
