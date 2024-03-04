import { ReportsApiEnum } from 'modules/reports/constants'
import { GetAmountEquipmentSpentReportXlsxSuccessResponse } from 'modules/reports/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getAmountEquipmentSpentReportXlsxMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsApiEnum.GetAmountEquipmentSpentReport)

export const mockGetAmountEquipmentSpentReportXlsxSuccess = (
  options?: Partial<ResponseResolverOptions<GetAmountEquipmentSpentReportXlsxSuccessResponse>>,
) => getSuccessMockFn(getAmountEquipmentSpentReportXlsxMockFn(), options)()

export const mockGetAmountEquipmentSpentReportXlsxForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getAmountEquipmentSpentReportXlsxMockFn(), options)()

export const mockGetAmountEquipmentSpentReportXlsxServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getAmountEquipmentSpentReportXlsxMockFn(), options)()
