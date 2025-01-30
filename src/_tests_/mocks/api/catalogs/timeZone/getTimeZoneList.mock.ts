import { CatalogsApiEnum } from 'shared/catalogs/constants'
import { GetTimeZoneListSuccessResponse } from 'shared/catalogs/models/timeZones'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTimeZoneListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogsApiEnum.GetTimeZoneList)

export const mockGetTimeZoneListSuccess = (
  options?: Partial<ResponseResolverOptions<GetTimeZoneListSuccessResponse>>,
) => getSuccessMockFn(getTimeZoneListMockFn(), options)()
