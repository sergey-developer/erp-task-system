import { UserApiEnum } from 'modules/user/constants'
import { GetUsersSuccessResponse } from 'modules/user/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserListMockFn = () => getRequestMockFn(HttpMethodEnum.Get, UserApiEnum.GetUsers)

export const mockGetUserListSuccess = (
  options?: Partial<ResponseResolverOptions<GetUsersSuccessResponse>>,
) => getSuccessMockFn(getUserListMockFn(), options)()

export const mockGetUserListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getUserListMockFn(), options)()
