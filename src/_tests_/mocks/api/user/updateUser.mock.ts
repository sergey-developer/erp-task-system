import { UpdateUserSuccessResponse } from 'modules/user/models'
import { updateUserUrl } from 'modules/user/utils'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateUserMockFn = (userId: number) =>
  getRequestMockFn(HttpMethodEnum.Patch, updateUserUrl(userId))

export const mockUpdateUserSuccess = (
  userId: number,
  options?: Partial<ResponseResolverOptions<UpdateUserSuccessResponse>>,
) => getSuccessMockFn(updateUserMockFn(userId), options)()

export const mockUpdateUserServerError = (
  userId: number,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(updateUserMockFn(userId), options)()
