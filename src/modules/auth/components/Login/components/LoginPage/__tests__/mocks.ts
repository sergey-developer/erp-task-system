import { MockedRequest, ResponseResolver, RestContext, rest } from 'msw'

import api, { API_RESPONSE_DELAY } from '__tests__/mocks/api'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { makeAbsoluteApiUrl } from 'shared/services/api'

import { successLoginResponse } from './constants'

const mockLogin =
  (resolver: ResponseResolver<MockedRequest, RestContext>) => () => {
    api.use(rest.post(makeAbsoluteApiUrl('/user/auth'), resolver))
  }

export const mockLoginSuccess = mockLogin((req, res, ctx) => {
  return res.once(
    ctx.status(HttpStatusCodeEnum.Ok),
    ctx.json(successLoginResponse),
    ctx.delay(API_RESPONSE_DELAY),
  )
})

export const mockLoginBadRequestError = mockLogin((req, res, ctx) => {
  return res.once(
    ctx.status(HttpStatusCodeEnum.BadRequest),
    ctx.delay(API_RESPONSE_DELAY),
  )
})

export const mockLoginUnauthorizedError = () => {
  mockLogin((req, res, ctx) => {
    return res.once(
      ctx.status(HttpStatusCodeEnum.Unauthorized),
      ctx.delay(API_RESPONSE_DELAY),
    )
  })()

  api.use(
    rest.post(makeAbsoluteApiUrl('/user/refresh'), (req, res, ctx) => {
      return res.once(ctx.status(HttpStatusCodeEnum.Ok))
    }),
  )
}

export const mockLoginServerError = mockLogin((req, res, ctx) => {
  return res.once(
    ctx.status(HttpStatusCodeEnum.ServerError),
    ctx.delay(API_RESPONSE_DELAY),
  )
})
