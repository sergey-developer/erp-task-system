import { UserApiEnum } from 'modules/user/constants'
import { GetUserListSuccessResponse } from 'modules/user/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions,
} from '_tests_/mocks/api'

const getUserListMockFn = () => getRequestMockFn(HttpMethodEnum.Get, UserApiEnum.GetUserList)

export const mockGetUserListSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserListSuccessResponse>>,
) => getSuccessMockFn(getUserListMockFn(), options)()

export const mockGetUserListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getUserListMockFn(), options)()
