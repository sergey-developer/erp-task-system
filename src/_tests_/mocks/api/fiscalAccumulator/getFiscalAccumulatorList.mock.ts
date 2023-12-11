import { FiscalAccumulatorApiEnum } from 'modules/fiscalAccumulator/constants'
import { GetFiscalAccumulatorTasksSuccessResponse } from 'modules/fiscalAccumulator/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getFiscalAccumulatorListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, FiscalAccumulatorApiEnum.GetFiscalAccumulator)

export const mockGetFiscalAccumulatorListSuccess = (
  options?: Partial<ResponseResolverOptions<GetFiscalAccumulatorTasksSuccessResponse>>,
) => getSuccessMockFn(getFiscalAccumulatorListMockFn(), options)()

export const mockGetFiscalAccumulatorListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getFiscalAccumulatorListMockFn(), options)()
