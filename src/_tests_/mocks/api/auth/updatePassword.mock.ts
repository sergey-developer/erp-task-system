import { AuthEndpointsEnum } from 'modules/auth/constants'
import { UpdatePasswordSuccessResponse } from 'modules/auth/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import {
  getBadRequestErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  getUnauthorizedErrorMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updatePasswordMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, AuthEndpointsEnum.UpdatePassword)

export const mockUpdatePasswordSuccess = (
  options?: Partial<ResponseResolverOptions<UpdatePasswordSuccessResponse>>,
) => getSuccessMockFn(updatePasswordMockFn(), options)()

export const mockUpdatePasswordBadRequestError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getBadRequestErrorMockFn(updatePasswordMockFn(), options)()

export const mockUpdatePasswordUnauthorizedError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getUnauthorizedErrorMockFn(updatePasswordMockFn(), options)()

export const mockUpdatePasswordNotFoundError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(updatePasswordMockFn(), options)()

export const mockUpdatePasswordServerError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getServerErrorMockFn(updatePasswordMockFn(), options)()
