import { CountryApiEnum } from 'shared/constants/country'
import { HttpMethodEnum } from 'shared/constants/http'
import { GetCountryListSuccessResponse } from 'shared/models/country'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions,
} from '_tests_/mocks/api'

const getCountryListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CountryApiEnum.GetCountryList)

export const mockGetCountryListSuccess = (
  options?: Partial<ResponseResolverOptions<GetCountryListSuccessResponse>>,
) => getSuccessMockFn(getCountryListMockFn(), options)()

export const mockGetCountryListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getCountryListMockFn(), options)()
