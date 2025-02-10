import { GetHistoryNomenclatureOperationsReportSuccessResponse } from 'features/reports/api/dto'
import { getHistoryNomenclatureOperationsReportUrl } from 'features/reports/utils'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getHistoryNomenclatureOperationsReportMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getHistoryNomenclatureOperationsReportUrl(id))

export const mockGetHistoryNomenclatureOperationsReportSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetHistoryNomenclatureOperationsReportSuccessResponse>>,
) => getSuccessMockFn(getHistoryNomenclatureOperationsReportMockFn(id), options)()

export const mockGetHistoryNomenclatureOperationsReportForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getHistoryNomenclatureOperationsReportMockFn(id), options)()

export const mockGetHistoryNomenclatureOperationsReportServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getHistoryNomenclatureOperationsReportMockFn(id), options)()
