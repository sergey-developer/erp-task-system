import { UpdateUserStatusSuccessResponse } from 'modules/user/models'
import { updateUserStatusUrl } from 'modules/user/utils'

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

const updateUserStatusMockFn = (userId: number) =>
  getRequestMockFn(HttpMethodEnum.Post, updateUserStatusUrl(userId))

export const mockUpdateUserStatusSuccess = (
  userId: number,
  options?: Partial<ResponseResolverOptions<UpdateUserStatusSuccessResponse>>,
) => getSuccessMockFn(updateUserStatusMockFn(userId), options)()

export const mockUpdateUserStatusBadRequestError = (
  userId: number,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getBadRequestErrorMockFn(updateUserStatusMockFn(userId), options)()

export const mockUpdateUserStatusUnauthorizedError = (
  userId: number,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getUnauthorizedErrorMockFn(updateUserStatusMockFn(userId), options)()

export const mockUpdateUserStatusNotFoundError = (
  userId: number,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(updateUserStatusMockFn(userId), options)()

export const mockUpdateUserStatusServerError = (
  userId: number,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(updateUserStatusMockFn(userId), options)()
