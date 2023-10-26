import { FiscalAccumulatorApiEnum } from 'modules/fiscalAccumulator/constants'
import { GetFiscalAccumulatorListSuccessResponse } from 'modules/fiscalAccumulator/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getFiscalAccumulatorListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, FiscalAccumulatorApiEnum.GetFiscalAccumulator)

export const mockGetFiscalAccumulatorListSuccess = (
  options?: Partial<ResponseResolverOptions<GetFiscalAccumulatorListSuccessResponse>>,
) => getSuccessMockFn(getFiscalAccumulatorListMockFn(), options)()

export const mockGetFiscalAccumulatorListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getFiscalAccumulatorListMockFn(), options)()
