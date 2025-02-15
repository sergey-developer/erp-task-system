import { makeUpdateUserApiPath } from 'features/users/api/helpers'
import { UpdateUserResponse } from 'features/users/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateUserMockFn = (userId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Patch, makeUpdateUserApiPath(userId))

export const mockUpdateUserSuccess = (
  userId: IdType,
  options?: Partial<ResponseResolverOptions<UpdateUserResponse>>,
) => getSuccessMockFn(updateUserMockFn(userId), options)()

export const mockUpdateUserServerError = (
  userId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(updateUserMockFn(userId), options)()
