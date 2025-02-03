import { CatalogEndpointsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetCountriesCatalogSuccessResponse } from 'shared/catalogs/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getCountryListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogEndpointsEnum.GetCountryCatalog)

export const mockGetCountryListSuccess = (
  options?: Partial<ResponseResolverOptions<GetCountriesCatalogSuccessResponse>>,
) => getSuccessMockFn(getCountryListMockFn(), options)()

export const mockGetCountryListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getCountryListMockFn(), options)()
