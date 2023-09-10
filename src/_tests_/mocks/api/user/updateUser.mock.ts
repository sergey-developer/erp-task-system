import { UpdateUserSuccessResponse } from 'modules/user/models'
import { updateUserUrl } from 'modules/user/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn, ResponseResolverOptions } from '_tests_/mocks/api'

const updateUserMockFn = (userId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Patch, updateUserUrl(userId))

export const mockUpdateUserSuccess = (
  userId: IdType,
  options?: Partial<ResponseResolverOptions<UpdateUserSuccessResponse>>,
) => getSuccessMockFn(updateUserMockFn(userId), options)()

export const mockUpdateUserServerError = (
  userId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(updateUserMockFn(userId), options)()
