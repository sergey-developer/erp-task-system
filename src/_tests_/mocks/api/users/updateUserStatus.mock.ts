import { makeUpdateUserStatusApiPath } from 'features/users/api/helpers'
import { UpdateUserStatusResponse } from 'features/users/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  getUnauthorizedErrorMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateUserStatusMockFn = (userId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, makeUpdateUserStatusApiPath(userId))

export const mockUpdateUserStatusSuccess = (
  userId: IdType,
  options?: Partial<ResponseResolverOptions<UpdateUserStatusResponse>>,
) => getSuccessMockFn(updateUserStatusMockFn(userId), options)()

export const mockUpdateUserStatusBadRequestError = (
  userId: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getBadRequestErrorMockFn(updateUserStatusMockFn(userId), options)()

export const mockUpdateUserStatusUnauthorizedError = (
  userId: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getUnauthorizedErrorMockFn(updateUserStatusMockFn(userId), options)()

export const mockUpdateUserStatusNotFoundError = (
  userId: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(updateUserStatusMockFn(userId), options)()

export const mockUpdateUserStatusServerError = (
  userId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(updateUserStatusMockFn(userId), options)()
