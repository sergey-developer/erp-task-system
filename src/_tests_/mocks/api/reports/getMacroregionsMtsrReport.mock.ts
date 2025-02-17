import { ReportsApiPathsEnum } from 'features/reports/api/constants'
import { GetMacroregionsMtsrReportResponse } from 'features/reports/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getMacroregionsMtsrReportMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiPathsEnum.GetMacroregionsMtsrReport)

export const mockGetMacroregionsMtsrReportSuccess = (
  options?: Partial<ResponseResolverOptions<GetMacroregionsMtsrReportResponse>>,
) => getSuccessMockFn(getMacroregionsMtsrReportMockFn(), options)()

export const mockGetMacroregionsMtsrReportForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getMacroregionsMtsrReportMockFn(), options)()

export const mockGetMacroregionsMtsrReportServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getMacroregionsMtsrReportMockFn(), options)()
