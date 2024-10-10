import { CatalogsApiEnum } from 'shared/constants/catalogs'
import { HttpMethodEnum } from 'shared/constants/http'
import { GetLocationsCatalogSuccessResponse } from 'shared/models/catalogs/locations'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getLocationsCatalogMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogsApiEnum.GetLocations)

export const mockGetLocationsCatalogSuccess = (
  options?: Partial<ResponseResolverOptions<GetLocationsCatalogSuccessResponse>>,
) => getSuccessMockFn(getLocationsCatalogMockFn(), options)()
