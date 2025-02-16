import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetUserStatusesCatalogResponse } from 'shared/catalogs/userStatuses/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserStatusListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetUserStatuses)

export const mockGetUserStatusListSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserStatusesCatalogResponse>>,
) => getSuccessMockFn(getUserStatusListMockFn(), options)()
