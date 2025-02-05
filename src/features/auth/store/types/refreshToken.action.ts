import { AuthTokensPayload, JwtParseResult } from './authTokens'

export type RefreshTokenActionPayload = AuthTokensPayload & {
  user: JwtParseResult
}
