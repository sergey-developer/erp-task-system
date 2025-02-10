import { ReportsEndpointsEnum } from 'features/reports/api/constants'
import { GetSupportGroupsMtsrReportSuccessResponse } from 'features/reports/api/dto'

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
  getRequestMockFn(HttpMethodEnum.Get, ReportsEndpointsEnum.GetSupportGroupsMtsrReport)

export const mockGetSupportGroupsMtsrReportSuccess = (
  options?: Partial<ResponseResolverOptions<GetSupportGroupsMtsrReportSuccessResponse>>,
) => getSuccessMockFn(getSupportGroupsMtsrReportMockFn(), options)()

export const mockGetSupportGroupsMtsrReportForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getSupportGroupsMtsrReportMockFn(), options)()

export const mockGetSupportGroupsMtsrReportServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getSupportGroupsMtsrReportMockFn(), options)()
