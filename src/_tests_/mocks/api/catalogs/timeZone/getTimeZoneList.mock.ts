import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetTimeZonesCatalogResponse } from 'shared/catalogs/timeZones/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTimeZoneListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetTimeZones)

export const mockGetTimeZoneListSuccess = (
  options?: Partial<ResponseResolverOptions<GetTimeZonesCatalogResponse>>,
) => getSuccessMockFn(getTimeZoneListMockFn(), options)()
