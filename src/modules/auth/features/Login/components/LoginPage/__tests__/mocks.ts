import { API_RESPONSE_DELAY } from '__tests__/constants'
import { getRequestMocker } from '__tests__/mocks/request'
import { AuthEndpointsEnum } from 'modules/auth/constants/api'
import { mockRefreshToken } from 'modules/auth/features/RefreshToken/__tests__/mocks'
import { HttpMethodEnum, HttpStatusCodeEnum } from 'shared/constants/http'

import { loginResponseSuccess } from './constants'

const mockLogin = getRequestMocker(HttpMethodEnum.POST, AuthEndpointsEnum.Login)

export const mockLoginSuccess = mockLogin((req, res, ctx) =>
  res.once(
    ctx.status(HttpStatusCodeEnum.Ok),
    ctx.json(loginResponseSuccess),
    ctx.delay(API_RESPONSE_DELAY),
  ),
)

export const mockLoginBadRequestError = mockLogin((req, res, ctx) =>
  res.once(
    ctx.status(HttpStatusCodeEnum.BadRequest),
    ctx.delay(API_RESPONSE_DELAY),
  ),
)

export const mockLoginUnauthorizedError = () => {
  const doMockLogin = mockLogin((req, res, ctx) =>
    res.once(
      ctx.status(HttpStatusCodeEnum.Unauthorized),
      ctx.delay(API_RESPONSE_DELAY),
    ),
  )

  const doMockRefreshToken = mockRefreshToken((req, res, ctx) =>
    res.once(ctx.status(HttpStatusCodeEnum.Ok)),
  )

  doMockLogin()
  doMockRefreshToken()
}

export const mockLoginServerError = mockLogin((req, res, ctx) =>
  res.once(
    ctx.status(HttpStatusCodeEnum.ServerError),
    ctx.delay(API_RESPONSE_DELAY),
  ),
)
