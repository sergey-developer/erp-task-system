import { ReportsEndpointsEnum } from 'features/reports/api/constants'
import { GetAmountEquipmentSpentReportResponse } from 'features/reports/api/dto'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getAmountEquipmentSpentReportMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, ReportsEndpointsEnum.GetAmountEquipmentSpentReport)

export const mockGetAmountEquipmentSpentReportSuccess = (
  options?: Partial<ResponseResolverOptions<GetAmountEquipmentSpentReportResponse>>,
) => getSuccessMockFn(getAmountEquipmentSpentReportMockFn(), options)()

export const mockGetAmountEquipmentSpentReportForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getAmountEquipmentSpentReportMockFn(), options)()

export const mockGetAmountEquipmentSpentReportServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getAmountEquipmentSpentReportMockFn(), options)()
