import { API_RESPONSE_DELAY } from '__tests__/constants'
import { getRequestMocker } from '__tests__/mocks/request'
import { AuthEndpointsEnum } from 'modules/auth/constants/api'
import { refreshTokenMocker } from 'modules/auth/features/RefreshToken/__tests__/mocks'
import { HttpMethodEnum, HttpStatusCodeEnum } from 'shared/constants/http'

import { loginResponseSuccess } from './constants'

const loginMocker = getRequestMocker(
  HttpMethodEnum.Post,
  AuthEndpointsEnum.Login,
)

export const mockLoginSuccess = loginMocker((req, res, ctx) =>
  res.once(
    ctx.status(HttpStatusCodeEnum.Ok),
    ctx.json(loginResponseSuccess),
    ctx.delay(API_RESPONSE_DELAY),
  ),
)

export const mockLoginBadRequestError = loginMocker((req, res, ctx) =>
  res.once(
    ctx.status(HttpStatusCodeEnum.BadRequest),
    ctx.delay(API_RESPONSE_DELAY),
  ),
)

export const mockLoginUnauthorizedError = () => {
  const mockLogin = loginMocker((req, res, ctx) =>
    res.once(
      ctx.status(HttpStatusCodeEnum.Unauthorized),
      ctx.delay(API_RESPONSE_DELAY),
    ),
  )

  const mockRefreshToken = refreshTokenMocker((req, res, ctx) =>
    res.once(ctx.status(HttpStatusCodeEnum.Ok)),
  )

  mockLogin()
  mockRefreshToken()
}

export const mockLoginServerError = loginMocker((req, res, ctx) =>
  res.once(
    ctx.status(HttpStatusCodeEnum.ServerError),
    ctx.delay(API_RESPONSE_DELAY),
  ),
)
