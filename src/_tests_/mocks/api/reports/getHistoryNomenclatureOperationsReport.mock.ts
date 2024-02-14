import { ReportsApiEnum } from 'modules/reports/constants'
import { GetHistoryNomenclatureOperationsReportSuccessResponse } from 'modules/reports/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getHistoryNomenclatureOperationsReportMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiEnum.GetHistoryNomenclatureOperationsReport)

export const mockGetHistoryNomenclatureOperationsReportSuccess = (
  options?: Partial<ResponseResolverOptions<GetHistoryNomenclatureOperationsReportSuccessResponse>>,
) => getSuccessMockFn(getHistoryNomenclatureOperationsReportMockFn(), options)()

export const mockGetHistoryNomenclatureOperationsReportForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getHistoryNomenclatureOperationsReportMockFn(), options)()

export const mockGetHistoryNomenclatureOperationsReportServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getHistoryNomenclatureOperationsReportMockFn(), options)()
