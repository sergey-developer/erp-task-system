import { ReportsApiEnum } from 'modules/reports/constants'
import { GetAmountEquipmentSpentReportXlsxSuccessResponse } from 'modules/reports/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getAmountEquipmentSpentReportXlsxMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiEnum.GetAmountEquipmentSpentReport)

export const mockGetAmountEquipmentSpentReportXlsxSuccess = (
  options?: Partial<ResponseResolverOptions<GetAmountEquipmentSpentReportXlsxSuccessResponse>>,
) => getSuccessMockFn(getAmountEquipmentSpentReportXlsxMockFn(), options)()
