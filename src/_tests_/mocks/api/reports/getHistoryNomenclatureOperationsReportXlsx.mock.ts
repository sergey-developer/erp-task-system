import { GetHistoryNomenclatureOperationsReportXlsxSuccessResponse } from 'modules/reports/models'
import { getHistoryNomenclatureOperationsReportUrl } from 'modules/reports/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getHistoryNomenclatureOperationsReportXlsxMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getHistoryNomenclatureOperationsReportUrl(id))

export const mockGetHistoryNomenclatureOperationsReportXlsxSuccess = (
  id: IdType,
  options?: Partial<
    ResponseResolverOptions<GetHistoryNomenclatureOperationsReportXlsxSuccessResponse>
  >,
) => getSuccessMockFn(getHistoryNomenclatureOperationsReportXlsxMockFn(id), options)()

export const mockGetHistoryNomenclatureOperationsReportXlsxForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getHistoryNomenclatureOperationsReportXlsxMockFn(id), options)()

export const mockGetHistoryNomenclatureOperationsReportXlsxServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getHistoryNomenclatureOperationsReportXlsxMockFn(id), options)()
