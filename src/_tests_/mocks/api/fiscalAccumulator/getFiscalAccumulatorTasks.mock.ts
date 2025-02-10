import { ReportsEndpointsEnum } from 'features/reports/api/constants'
import { GetFiscalAccumulatorTasksReportSuccessResponse } from 'features/reports/api/dto'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getFiscalAccumulatorTasksMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsEndpointsEnum.GetFiscalAccumulatorTasksReport)

export const mockGetFiscalAccumulatorTasksSuccess = (
  options?: Partial<ResponseResolverOptions<GetFiscalAccumulatorTasksReportSuccessResponse>>,
) => getSuccessMockFn(getFiscalAccumulatorTasksMockFn(), options)()

export const mockGetFiscalAccumulatorTasksServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getFiscalAccumulatorTasksMockFn(), options)()
