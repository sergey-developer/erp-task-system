import { FiscalAccumulatorApiEnum } from 'modules/fiscalAccumulator/constants'
import { GetFiscalAccumulatorsSuccessResponse } from 'modules/fiscalAccumulator/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getFiscalAccumulatorsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, FiscalAccumulatorApiEnum.GetFiscalAccumulators)

export const mockGetFiscalAccumulatorsSuccess = (
  options?: Partial<ResponseResolverOptions<GetFiscalAccumulatorsSuccessResponse>>,
) => getSuccessMockFn(getFiscalAccumulatorsMockFn(), options)()

export const mockGetFiscalAccumulatorsServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getFiscalAccumulatorsMockFn(), options)()
