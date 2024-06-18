import { GetAmountEquipmentSpentReportXlsxSuccessResponse } from 'modules/reports/models'
import { getHistoryNomenclatureOperationsReportUrl } from 'modules/reports/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getHistoryNomenclatureOperationsReportXlsxMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getHistoryNomenclatureOperationsReportUrl(id))

export const mockGetHistoryNomenclatureOperationsReportXlsxSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetAmountEquipmentSpentReportXlsxSuccessResponse>>,
) => getSuccessMockFn(getHistoryNomenclatureOperationsReportXlsxMockFn(id), options)()
