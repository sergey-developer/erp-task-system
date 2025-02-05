import { IdType } from 'shared/types/common'

export type JwtParseResult = {
  userId: IdType
}

export type AuthTokensPayload = {
  access: string
  refresh: string
}
