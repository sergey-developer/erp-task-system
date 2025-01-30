import { UpdateUserStatusSuccessResponse } from 'features/user/models'
import { updateUserStatusUrl } from 'features/user/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/services/baseApi'
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
  getRequestMockFn(HttpMethodEnum.Post, updateUserStatusUrl(userId))

export const mockUpdateUserStatusSuccess = (
  userId: IdType,
  options?: Partial<ResponseResolverOptions<UpdateUserStatusSuccessResponse>>,
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
