import { ReportsApiPathsEnum } from 'features/reports/api/constants'
import { GetFiscalAccumulatorTasksReportResponse } from 'features/reports/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getFiscalAccumulatorTasksMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiPathsEnum.GetFiscalAccumulatorTasksReport)

export const mockGetFiscalAccumulatorTasksSuccess = (
  options?: Partial<ResponseResolverOptions<GetFiscalAccumulatorTasksReportResponse>>,
) => getSuccessMockFn(getFiscalAccumulatorTasksMockFn(), options)()

export const mockGetFiscalAccumulatorTasksServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getFiscalAccumulatorTasksMockFn(), options)()
