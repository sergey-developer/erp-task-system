import { GetAmountEquipmentSpentReportXlsxResponse } from 'features/reports/api/dto'
import { makeHistoryNomenclatureOperationsReportEndpoint } from 'features/reports/helpers'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getHistoryNomenclatureOperationsReportXlsxMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeHistoryNomenclatureOperationsReportEndpoint(id))

export const mockGetHistoryNomenclatureOperationsReportXlsxSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetAmountEquipmentSpentReportXlsxResponse>>,
) => getSuccessMockFn(getHistoryNomenclatureOperationsReportXlsxMockFn(id), options)()
