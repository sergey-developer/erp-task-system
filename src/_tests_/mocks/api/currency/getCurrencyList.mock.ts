import { GetCurrencyListSuccessResponse } from 'shared/catalogs/models/currencies'
import { CurrencyApiEnum } from 'shared/constants/currency'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getCurrencyListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CurrencyApiEnum.GetCurrencyList)

export const mockGetCurrencyListSuccess = (
  options?: Partial<ResponseResolverOptions<GetCurrencyListSuccessResponse>>,
) => getSuccessMockFn(getCurrencyListMockFn(), options)()

export const mockGetCurrencyListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getCurrencyListMockFn(), options)()
