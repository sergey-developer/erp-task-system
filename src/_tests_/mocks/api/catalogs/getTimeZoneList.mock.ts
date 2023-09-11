import { CatalogsApiEnum } from 'shared/constants/catalogs'
import { HttpMethodEnum } from 'shared/constants/http'
import { GetTimeZoneListSuccessResponse } from 'shared/models/catalogs'

import { getRequestMockFn, getSuccessMockFn, ResponseResolverOptions } from '_tests_/mocks/api'

const getTimeZoneListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogsApiEnum.GetTimeZoneList)

export const mockGetTimeZoneListSuccess = (
  options?: Partial<ResponseResolverOptions<GetTimeZoneListSuccessResponse>>,
) => getSuccessMockFn(getTimeZoneListMockFn(), options)()
