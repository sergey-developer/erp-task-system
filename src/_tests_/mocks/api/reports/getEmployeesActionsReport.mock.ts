import { GetEmployeesActionsReportSuccessResponse } from 'modules/reports/models'
import { getEmployeesActionsReportUrl } from 'modules/reports/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEmployeesActionsReportMockFn = (employeeId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getEmployeesActionsReportUrl(employeeId))

export const mockGetEmployeesActionsReportSuccess = (
  employeeId: IdType,
  options?: Partial<ResponseResolverOptions<GetEmployeesActionsReportSuccessResponse>>,
) => getSuccessMockFn(getEmployeesActionsReportMockFn(employeeId), options)()

export const mockGetEmployeesActionsReportForbiddenError = (
  employeeId: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEmployeesActionsReportMockFn(employeeId), options)()

export const mockGetEmployeesActionsReportNotFoundError = (
  employeeId: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getEmployeesActionsReportMockFn(employeeId), options)()

export const mockGetEmployeesActionsReportServerError = (
  employeeId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEmployeesActionsReportMockFn(employeeId), options)()
