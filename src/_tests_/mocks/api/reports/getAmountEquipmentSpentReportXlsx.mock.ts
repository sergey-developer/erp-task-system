import { ReportsApiPathsEnum } from 'features/reports/api/constants'
import { GetAmountEquipmentSpentReportXlsxResponse } from 'features/reports/api/dto'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getAmountEquipmentSpentReportXlsxMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiPathsEnum.GetAmountEquipmentSpentReport)

export const mockGetAmountEquipmentSpentReportXlsxSuccess = (
  options?: Partial<ResponseResolverOptions<GetAmountEquipmentSpentReportXlsxResponse>>,
) => getSuccessMockFn(getAmountEquipmentSpentReportXlsxMockFn(), options)()
