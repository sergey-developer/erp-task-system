import { HttpMethodEnum } from 'shared/constants/http'
import { BaseApiEnum } from 'shared/services/api'
import { GetTimeZoneListSuccessResponse } from 'shared/services/api/models'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTimeZoneListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, BaseApiEnum.GetTimeZones)

export const mockGetTimeZoneListSuccess = (
  options?: Partial<ResponseResolverOptions<GetTimeZoneListSuccessResponse>>,
) => getSuccessMockFn(getTimeZoneListMockFn(), options)()
