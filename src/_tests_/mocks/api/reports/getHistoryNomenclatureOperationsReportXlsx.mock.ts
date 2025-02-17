import { makeHistoryNomenclatureOperationsReportApiPath } from 'features/reports/api/helpers'
import { GetAmountEquipmentSpentReportXlsxResponse } from 'features/reports/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getHistoryNomenclatureOperationsReportXlsxMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeHistoryNomenclatureOperationsReportApiPath(id))

export const mockGetHistoryNomenclatureOperationsReportXlsxSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetAmountEquipmentSpentReportXlsxResponse>>,
) => getSuccessMockFn(getHistoryNomenclatureOperationsReportXlsxMockFn(id), options)()
