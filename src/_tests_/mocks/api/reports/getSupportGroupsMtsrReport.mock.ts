import { ReportsApiPathsEnum } from 'features/reports/api/constants'
import { GetSupportGroupsMtsrReportResponse } from 'features/reports/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSupportGroupsMtsrReportMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiPathsEnum.GetSupportGroupsMtsrReport)

export const mockGetSupportGroupsMtsrReportSuccess = (
  options?: Partial<ResponseResolverOptions<GetSupportGroupsMtsrReportResponse>>,
) => getSuccessMockFn(getSupportGroupsMtsrReportMockFn(), options)()

export const mockGetSupportGroupsMtsrReportForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getSupportGroupsMtsrReportMockFn(), options)()

export const mockGetSupportGroupsMtsrReportServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getSupportGroupsMtsrReportMockFn(), options)()
