import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants/endpoints'
import { GetCurrenciesCatalogResponse } from 'shared/catalogs/currencies/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getCurrenciesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetCurrencies)

export const mockGetCurrenciesSuccess = (
  options?: Partial<ResponseResolverOptions<GetCurrenciesCatalogResponse>>,
) => getSuccessMockFn(getCurrenciesMockFn(), options)()
