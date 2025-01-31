import { GetLocationsCatalogSuccessResponse } from 'shared/catalogs/api/dto/locations'
import { CatalogsApiEnum } from 'shared/catalogs/constants'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getLocationsCatalogMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogsApiEnum.GetLocations)

export const mockGetLocationsCatalogSuccess = (
  options?: Partial<ResponseResolverOptions<GetLocationsCatalogSuccessResponse>>,
) => getSuccessMockFn(getLocationsCatalogMockFn(), options)()
