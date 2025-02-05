import { AuthTokensPayload, JwtParseResult } from './authTokens'

export type LoginActionPayload = AuthTokensPayload & {
  user: JwtParseResult
}
