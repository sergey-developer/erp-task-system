import { UserApiEnum } from 'modules/user/constants'
import { GetUsersSuccessResponse } from 'modules/user/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUsersMockFn = () => getRequestMockFn(HttpMethodEnum.Get, UserApiEnum.GetUsers)

export const mockGetUsersSuccess = (
  options?: Partial<ResponseResolverOptions<GetUsersSuccessResponse>>,
) => getSuccessMockFn(getUsersMockFn(), options)()
