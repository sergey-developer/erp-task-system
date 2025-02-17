import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetCountriesCatalogResponse } from 'shared/catalogs/countries/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getCountriesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetCountries)

export const mockGetCountriesSuccess = (
  options?: Partial<ResponseResolverOptions<GetCountriesCatalogResponse>>,
) => getSuccessMockFn(getCountriesMockFn(), options)()

export const mockGetCountriesServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getCountriesMockFn(), options)()
