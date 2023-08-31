import { CountryApiEnum } from 'modules/warehouse/constants'
import { GetCountryListSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getCountryListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CountryApiEnum.GetCountryList)

export const mockGetCountryListSuccess = (
  options?: Partial<ResponseResolverOptions<GetCountryListSuccessResponse>>,
) => getSuccessMockFn(getCountryListMockFn(), options)()

export const mockGetCountryListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getCountryListMockFn(), options)()
