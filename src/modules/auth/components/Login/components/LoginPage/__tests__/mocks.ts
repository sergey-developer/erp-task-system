import api from '__tests__/mocks/api'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { makeRelativeApiUrl } from 'shared/services/api'

import { successLoginResponse } from './constants'

export const mockLoginSuccess = () => {
  api
    .onPost(makeRelativeApiUrl('/user/auth'))
    .reply(HttpStatusCodeEnum.Ok, successLoginResponse)
}

export const mockLoginBadRequestError = () => {
  api
    .onPost(makeRelativeApiUrl('/user/auth'))
    .reply(HttpStatusCodeEnum.BadRequest)
}

export const mockLoginUnauthorizedError = () => {
  api
    .onPost(makeRelativeApiUrl('/user/auth'))
    .reply(HttpStatusCodeEnum.Unauthorized)
}
