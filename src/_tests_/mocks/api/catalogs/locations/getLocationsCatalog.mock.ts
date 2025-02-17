import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetLocationsCatalogResponse } from 'shared/catalogs/locations/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getLocationsCatalogMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetLocations)

export const mockGetLocationsCatalogSuccess = (
  options?: Partial<ResponseResolverOptions<GetLocationsCatalogResponse>>,
) => getSuccessMockFn(getLocationsCatalogMockFn(), options)()
