import { ReportsEndpointsEnum } from 'features/reports/api/constants'
import { GetMacroregionsMtsrReportResponse } from 'features/reports/api/dto'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getMacroregionsMtsrReportMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsEndpointsEnum.GetMacroregionsMtsrReport)

export const mockGetMacroregionsMtsrReportSuccess = (
  options?: Partial<ResponseResolverOptions<GetMacroregionsMtsrReportResponse>>,
) => getSuccessMockFn(getMacroregionsMtsrReportMockFn(), options)()

export const mockGetMacroregionsMtsrReportForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getMacroregionsMtsrReportMockFn(), options)()

export const mockGetMacroregionsMtsrReportServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getMacroregionsMtsrReportMockFn(), options)()
