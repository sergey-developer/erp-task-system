import { GetUserListSuccessResponse } from 'modules/user/models'
import { UserApiEnum } from 'modules/user/services/userApiService'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserListMockFn = () => getRequestMockFn(HttpMethodEnum.Get, UserApiEnum.GetUserList)

export const mockGetUserListSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserListSuccessResponse>>,
) => getSuccessMockFn(getUserListMockFn(), options)()

export const mockGetUserListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getUserListMockFn(), options)()
