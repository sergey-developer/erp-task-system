import { ReportsApiEnum } from 'features/reports/constants'
import { GetWorkGroupsMtsrReportSuccessResponse } from 'features/reports/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/services/baseApi'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWorkGroupsMtsrReportMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiEnum.GetWorkGroupsMtsrReport)

export const mockGetWorkGroupsMtsrReportSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkGroupsMtsrReportSuccessResponse>>,
) => getSuccessMockFn(getWorkGroupsMtsrReportMockFn(), options)()

export const mockGetWorkGroupsMtsrReportForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getWorkGroupsMtsrReportMockFn(), options)()

export const mockGetWorkGroupsMtsrReportServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getWorkGroupsMtsrReportMockFn(), options)()
