import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetTimeZonesCatalogResponse } from 'shared/catalogs/timeZones/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getTimeZonesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetTimeZones)

export const mockGetTimeZonesSuccess = (
  options?: Partial<ResponseResolverOptions<GetTimeZonesCatalogResponse>>,
) => getSuccessMockFn(getTimeZonesMockFn(), options)()
