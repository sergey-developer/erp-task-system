import { ReportsApiPathsEnum } from 'features/reports/api/constants'
import { GetWorkGroupsMtsrReportResponse } from 'features/reports/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getWorkGroupsMtsrReportMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiPathsEnum.GetWorkGroupsMtsrReport)

export const mockGetWorkGroupsMtsrReportSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkGroupsMtsrReportResponse>>,
) => getSuccessMockFn(getWorkGroupsMtsrReportMockFn(), options)()

export const mockGetWorkGroupsMtsrReportForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getWorkGroupsMtsrReportMockFn(), options)()

export const mockGetWorkGroupsMtsrReportServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getWorkGroupsMtsrReportMockFn(), options)()
