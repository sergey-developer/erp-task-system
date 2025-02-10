import { GetAmountEquipmentSpentReportXlsxSuccessResponse } from 'features/reports/api/dto'
import { ReportsApiEnum } from 'features/reports/constants'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getAmountEquipmentSpentReportXlsxMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiEnum.GetAmountEquipmentSpentReport)

export const mockGetAmountEquipmentSpentReportXlsxSuccess = (
  options?: Partial<ResponseResolverOptions<GetAmountEquipmentSpentReportXlsxSuccessResponse>>,
) => getSuccessMockFn(getAmountEquipmentSpentReportXlsxMockFn(), options)()
