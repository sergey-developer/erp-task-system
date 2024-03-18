import { ReportsApiEnum } from 'modules/reports/constants'
import { GetUsersMtsrReportSuccessResponse } from 'modules/reports/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUsersMtsrReportMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiEnum.GetUsersMtsrReport)

export const mockGetUsersMtsrReportSuccess = (
  options?: Partial<ResponseResolverOptions<GetUsersMtsrReportSuccessResponse>>,
) => getSuccessMockFn(getUsersMtsrReportMockFn(), options)()

export const mockGetUsersMtsrReportForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getUsersMtsrReportMockFn(), options)()

export const mockGetUsersMtsrReportServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getUsersMtsrReportMockFn(), options)()
