import { CatalogsApiEnum } from 'shared/constants/catalogs'
import { HttpMethodEnum } from 'shared/constants/http'
import { GetLocationListSuccessResponse } from 'shared/models/catalogs/location'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getLocationListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogsApiEnum.GetLocationList)

export const mockGetLocationListSuccess = (
  options?: Partial<ResponseResolverOptions<GetLocationListSuccessResponse>>,
) => getSuccessMockFn(getLocationListMockFn(), options)()

export const mockGetLocationListServerError = (
  options?: Partial<ResponseResolverOptions<GetLocationListSuccessResponse>>,
) => getServerErrorMockFn(getLocationListMockFn(), options)()
