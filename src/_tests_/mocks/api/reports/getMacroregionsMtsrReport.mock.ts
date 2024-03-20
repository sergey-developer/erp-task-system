import { ReportsApiEnum } from 'modules/reports/constants'
import { GetMacroregionsMtsrReportSuccessResponse } from 'modules/reports/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getMacroregionsMtsrReportMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiEnum.GetMacroregionsMtsrReport)

export const mockGetMacroregionsMtsrReportSuccess = (
  options?: Partial<ResponseResolverOptions<GetMacroregionsMtsrReportSuccessResponse>>,
) => getSuccessMockFn(getMacroregionsMtsrReportMockFn(), options)()

export const mockGetMacroregionsMtsrReportForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getMacroregionsMtsrReportMockFn(), options)()

export const mockGetMacroregionsMtsrReportServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getMacroregionsMtsrReportMockFn(), options)()
