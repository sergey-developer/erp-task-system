import { MockedRequest, ResponseResolver, RestContext, rest } from 'msw'

import { HttpStatusCodeEnum } from 'shared/constants/http'
import { makeApiUrl } from 'shared/services/api'
import { server } from 'tests/mocks/server'
import { screen } from 'tests/test-utils'

import { successLoginResponse } from './constants'

const mockLoginApi =
  (mock: ResponseResolver<MockedRequest, RestContext>) => () => {
    return server.use(rest.post(makeApiUrl('user/auth'), mock))
  }

export const mockSuccessLogin = mockLoginApi((req, res, ctx) => {
  return res(ctx.status(HttpStatusCodeEnum.Ok), ctx.json(successLoginResponse))
})

export const getEmailField = () => screen.getByTestId('field-email')
export const getEmailInput = () => screen.getByTestId('input-email')

export const getPasswordField = () => screen.getByTestId('field-password')
export const getPasswordInput = () => screen.getByTestId('input-password')

export const getSubmitBtn = () => screen.getByTestId('btn-submit')
