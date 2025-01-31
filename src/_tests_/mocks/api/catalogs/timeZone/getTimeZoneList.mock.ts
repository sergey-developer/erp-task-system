import { GetTimeZoneListSuccessResponse } from 'shared/catalogs/api/dto/timeZones'
import { CatalogsApiEnum } from 'shared/catalogs/constants'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTimeZoneListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogsApiEnum.GetTimeZoneList)

export const mockGetTimeZoneListSuccess = (
  options?: Partial<ResponseResolverOptions<GetTimeZoneListSuccessResponse>>,
) => getSuccessMockFn(getTimeZoneListMockFn(), options)()
