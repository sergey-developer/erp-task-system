import { CustomerApiEnum } from 'modules/warehouse/constants'
import { GetCustomerListSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions
} from '_tests_/mocks/api'

const getCustomerListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, CustomerApiEnum.GetCustomerList)

export const mockGetCustomerListSuccess = (
  options?: Partial<ResponseResolverOptions<GetCustomerListSuccessResponse>>,
) => getSuccessMockFn(getCustomerListMockFn(), options)()

export const mockGetCustomerListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getCustomerListMockFn(), options)()
