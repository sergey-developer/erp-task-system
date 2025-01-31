import { GetUserStatusListSuccessResponse } from 'shared/catalogs/api/dto/userStatuses'
import { CatalogsApiEnum } from 'shared/catalogs/constants'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserStatusListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogsApiEnum.GetUserStatusList)

export const mockGetUserStatusListSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserStatusListSuccessResponse>>,
) => getSuccessMockFn(getUserStatusListMockFn(), options)()
