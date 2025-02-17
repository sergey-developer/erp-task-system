import { AuthApiPathsEnum } from 'features/auth/api/constants'
import { UpdatePasswordBadRequestResponse, UpdatePasswordResponse } from 'features/auth/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getBadRequestErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  getUnauthorizedErrorMockFn,
} from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const updatePasswordMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, AuthApiPathsEnum.UpdatePassword)

export const mockUpdatePasswordSuccess = (
  options?: Partial<ResponseResolverOptions<UpdatePasswordResponse>>,
) => getSuccessMockFn(updatePasswordMockFn(), options)()

export const mockUpdatePasswordBadRequestError = <
  T extends ErrorData<UpdatePasswordBadRequestResponse>,
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
