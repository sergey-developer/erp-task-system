import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetUserStatusesCatalogResponse } from 'shared/catalogs/userStatuses/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getUserStatusesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetUserStatuses)

export const mockGetUserStatusesSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserStatusesCatalogResponse>>,
) => getSuccessMockFn(getUserStatusesMockFn(), options)()
