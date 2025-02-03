import { LoginSuccessResponse } from '../schemas'
import { JwtPayload } from './common'

export type LoginActionPayload = LoginSuccessResponse & {
  user: JwtPayload
}
