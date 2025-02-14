import { ReportsApiPathsEnum } from 'features/reports/api/constants'
import { GetUsersMtsrReportResponse } from 'features/reports/api/dto'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUsersMtsrReportMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiPathsEnum.GetUsersMtsrReport)

export const mockGetUsersMtsrReportSuccess = (
  options?: Partial<ResponseResolverOptions<GetUsersMtsrReportResponse>>,
) => getSuccessMockFn(getUsersMtsrReportMockFn(), options)()

export const mockGetUsersMtsrReportForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getUsersMtsrReportMockFn(), options)()

export const mockGetUsersMtsrReportServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getUsersMtsrReportMockFn(), options)()
