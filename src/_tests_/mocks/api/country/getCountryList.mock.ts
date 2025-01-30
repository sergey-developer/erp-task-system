import { CatalogsApiEnum } from 'shared/catalogs/constants'
import { GetCountryListSuccessResponse } from 'shared/catalogs/models/countries'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getCountryListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogsApiEnum.GetCountryCatalog)

export const mockGetCountryListSuccess = (
  options?: Partial<ResponseResolverOptions<GetCountryListSuccessResponse>>,
) => getSuccessMockFn(getCountryListMockFn(), options)()

export const mockGetCountryListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getCountryListMockFn(), options)()
