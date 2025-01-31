import { GetCountryListSuccessResponse } from 'shared/catalogs/api/dto/countries'
import { CatalogsApiEnum } from 'shared/catalogs/constants'
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
