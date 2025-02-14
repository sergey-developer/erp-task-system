import { GetCustomersCatalogResponse } from 'features/warehouse/models'
import { CustomerApiEnum } from 'features/warehouse/services/customerApiService'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getCustomerListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CustomerApiEnum.GetCustomerList)

export const mockGetCustomerListSuccess = (
  options?: Partial<ResponseResolverOptions<GetCustomersCatalogResponse>>,
) => getSuccessMockFn(getCustomerListMockFn(), options)()

export const mockGetCustomerListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getCustomerListMockFn(), options)()
