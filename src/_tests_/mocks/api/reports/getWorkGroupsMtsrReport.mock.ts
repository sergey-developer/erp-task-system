import { ReportsEndpointsEnum } from 'features/reports/api/constants'
import { GetWorkGroupsMtsrReportSuccessResponse } from 'features/reports/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWorkGroupsMtsrReportMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsEndpointsEnum.GetWorkGroupsMtsrReport)

export const mockGetWorkGroupsMtsrReportSuccess = (
  options?: Partial<ResponseResolverOptions<GetWorkGroupsMtsrReportSuccessResponse>>,
) => getSuccessMockFn(getWorkGroupsMtsrReportMockFn(), options)()

export const mockGetWorkGroupsMtsrReportForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getWorkGroupsMtsrReportMockFn(), options)()

export const mockGetWorkGroupsMtsrReportServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getWorkGroupsMtsrReportMockFn(), options)()
