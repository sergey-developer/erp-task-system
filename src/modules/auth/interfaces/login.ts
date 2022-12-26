import { LoginResponseModel } from '../models'
import { JwtPayload } from './common'

export type LoginActionPayload = LoginResponseModel & {
  user: JwtPayload
}
