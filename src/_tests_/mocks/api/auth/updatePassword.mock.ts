import { AuthApiEnum } from 'features/auth/constants'
import {
  UpdatePasswordBadRequestErrorResponse,
  UpdatePasswordSuccessResponse,
} from 'features/auth/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/baseApi'

import {
  getBadRequestErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  getUnauthorizedErrorMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updatePasswordMockFn = () => getRequestMockFn(HttpMethodEnum.Post, AuthApiEnum.UpdatePassword)

export const mockUpdatePasswordSuccess = (
  options?: Partial<ResponseResolverOptions<UpdatePasswordSuccessResponse>>,
) => getSuccessMockFn(updatePasswordMockFn(), options)()

export const mockUpdatePasswordBadRequestError = <
  T extends ErrorData<UpdatePasswordBadRequestErrorResponse>,
>(
  options?: Partial<ResponseResolverOptions<T>>,
) => getBadRequestErrorMockFn(updatePasswordMockFn(), options)()

export const mockUpdatePasswordUnauthorizedError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getUnauthorizedErrorMockFn(updatePasswordMockFn(), options)()

export const mockUpdatePasswordNotFoundError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(updatePasswordMockFn(), options)()

export const mockUpdatePasswordServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(updatePasswordMockFn(), options)()
