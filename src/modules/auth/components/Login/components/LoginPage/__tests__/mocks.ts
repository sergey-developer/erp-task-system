import { rest } from 'msw'

import api, { API_RESPONSE_DELAY } from '__tests__/mocks/api'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { makeAbsoluteApiUrl } from 'shared/services/api'

import { successLoginResponse } from './constants'

export const mockLoginSuccess = () => {
  api.use(
    rest.post(makeAbsoluteApiUrl('/user/auth'), (req, res, ctx) => {
      return res.once(
        ctx.status(HttpStatusCodeEnum.Ok),
        ctx.json(successLoginResponse),
        ctx.delay(API_RESPONSE_DELAY),
      )
    }),
  )
}

export const mockLoginBadRequestError = () => {
  api.use(
    rest.post(makeAbsoluteApiUrl('/user/auth'), (req, res, ctx) => {
      return res.once(
        ctx.status(HttpStatusCodeEnum.BadRequest),
        ctx.delay(API_RESPONSE_DELAY),
      )
    }),
  )
}

export const mockLoginUnauthorizedError = () => {
  api.use(
    rest.post(makeAbsoluteApiUrl('/user/auth'), (req, res, ctx) => {
      return res.once(
        ctx.status(HttpStatusCodeEnum.Unauthorized),
        ctx.delay(API_RESPONSE_DELAY),
      )
    }),
    rest.post(makeAbsoluteApiUrl('/user/refresh'), (req, res, ctx) => {
      return res.once(ctx.status(HttpStatusCodeEnum.Ok))
    }),
  )
}

export const mockLoginServerError = () => {
  api.use(
    rest.post(makeAbsoluteApiUrl('/user/auth'), (req, res, ctx) => {
      return res.once(
        ctx.status(HttpStatusCodeEnum.ServerError),
        ctx.delay(API_RESPONSE_DELAY),
      )
    }),
  )
}
