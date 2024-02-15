import { ReportsApiEnum } from 'modules/reports/constants'
import { GetAmountEquipmentSpentReportSuccessResponse } from 'modules/reports/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getAmountEquipmentSpentReportMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiEnum.GetAmountEquipmentSpentReport)

export const mockGetAmountEquipmentSpentReportSuccess = (
  options?: Partial<ResponseResolverOptions<GetAmountEquipmentSpentReportSuccessResponse>>,
) => getSuccessMockFn(getAmountEquipmentSpentReportMockFn(), options)()

export const mockGetAmountEquipmentSpentReportForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getAmountEquipmentSpentReportMockFn(), options)()

export const mockGetAmountEquipmentSpentReportServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getAmountEquipmentSpentReportMockFn(), options)()
