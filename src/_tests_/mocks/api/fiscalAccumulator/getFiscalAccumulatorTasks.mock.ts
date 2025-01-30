import { ReportsApiEnum } from 'features/reports/constants'
import { GetFiscalAccumulatorTasksReportSuccessResponse } from 'features/reports/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getFiscalAccumulatorTasksMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiEnum.GetFiscalAccumulatorTasksReport)

export const mockGetFiscalAccumulatorTasksSuccess = (
  options?: Partial<ResponseResolverOptions<GetFiscalAccumulatorTasksReportSuccessResponse>>,
) => getSuccessMockFn(getFiscalAccumulatorTasksMockFn(), options)()

export const mockGetFiscalAccumulatorTasksServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getFiscalAccumulatorTasksMockFn(), options)()
