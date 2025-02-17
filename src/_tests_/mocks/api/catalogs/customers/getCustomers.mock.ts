import { CatalogApiPathsEnum } from 'shared/catalogs/api/constants'
import { GetCustomersCatalogResponse } from 'shared/catalogs/customers/api/schemas'
import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getCustomersMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CatalogApiPathsEnum.GetCustomers)

export const mockGetCustomersSuccess = (
  options?: Partial<ResponseResolverOptions<GetCustomersCatalogResponse>>,
) => getSuccessMockFn(getCustomersMockFn(), options)()
