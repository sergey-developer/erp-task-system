import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetCurrenciesCatalogResponse } from 'shared/catalogs/currencies/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getCurrencyListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetCurrencies)

export const mockGetCurrencyListSuccess = (
  options?: Partial<ResponseResolverOptions<GetCurrenciesCatalogResponse>>,
) => getSuccessMockFn(getCurrencyListMockFn(), options)()

export const mockGetCurrencyListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getCurrencyListMockFn(), options)()
