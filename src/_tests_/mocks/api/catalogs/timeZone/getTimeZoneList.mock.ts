import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetTimeZonesCatalogSuccessResponse } from 'shared/catalogs/timeZones/api/schemas/getTimeZonesCatalog.schema'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTimeZoneListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogEndpointsEnum.GetTimeZoneList)

export const mockGetTimeZoneListSuccess = (
  options?: Partial<ResponseResolverOptions<GetTimeZonesCatalogSuccessResponse>>,
) => getSuccessMockFn(getTimeZoneListMockFn(), options)()
