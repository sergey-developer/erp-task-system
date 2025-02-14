import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetLocationsCatalogResponse } from 'shared/catalogs/api/schemas/getLocationsCatalog.schema'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getLocationsCatalogMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogEndpointsEnum.GetLocations)

export const mockGetLocationsCatalogSuccess = (
  options?: Partial<ResponseResolverOptions<GetLocationsCatalogResponse>>,
) => getSuccessMockFn(getLocationsCatalogMockFn(), options)()
