import { ReportsApiEnum } from 'modules/reports/constants'
import { GetHistoryNomenclatureOperationsReportXlsxSuccessResponse } from 'modules/reports/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getHistoryNomenclatureOperationsReportXlsxMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiEnum.GetHistoryNomenclatureOperationsReport)

export const mockGetHistoryNomenclatureOperationsReportXlsxSuccess = (
  options?: Partial<
    ResponseResolverOptions<GetHistoryNomenclatureOperationsReportXlsxSuccessResponse>
  >,
) => getSuccessMockFn(getHistoryNomenclatureOperationsReportXlsxMockFn(), options)()

export const mockGetHistoryNomenclatureOperationsReportXlsxForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getHistoryNomenclatureOperationsReportXlsxMockFn(), options)()

export const mockGetHistoryNomenclatureOperationsReportXlsxServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getHistoryNomenclatureOperationsReportXlsxMockFn(), options)()
