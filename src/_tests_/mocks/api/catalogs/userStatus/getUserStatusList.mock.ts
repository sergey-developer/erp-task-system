import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetUserStatusesCatalogSuccessResponse } from 'shared/catalogs/api/dto/userStatuses'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserStatusListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogEndpointsEnum.GetUserStatusList)

export const mockGetUserStatusListSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserStatusesCatalogSuccessResponse>>,
) => getSuccessMockFn(getUserStatusListMockFn(), options)()
