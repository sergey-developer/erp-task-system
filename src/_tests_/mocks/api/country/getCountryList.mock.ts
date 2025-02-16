import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetCountriesCatalogResponse } from 'shared/catalogs/countries/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getCountryListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetCountries)

export const mockGetCountryListSuccess = (
  options?: Partial<ResponseResolverOptions<GetCountriesCatalogResponse>>,
) => getSuccessMockFn(getCountryListMockFn(), options)()

export const mockGetCountryListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getCountryListMockFn(), options)()
