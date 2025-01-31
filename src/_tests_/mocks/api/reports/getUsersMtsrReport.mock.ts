import { ReportsApiEnum } from 'features/reports/constants'
import { GetUsersMtsrReportSuccessResponse } from 'features/reports/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/baseApi'

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
