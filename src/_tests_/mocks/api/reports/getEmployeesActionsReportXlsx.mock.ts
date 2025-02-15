import { makeGetEmployeesActionsReportEndpoint } from 'features/reports/api/helpers'
import { GetEmployeesActionsReportXlsxResponse } from 'features/reports/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEmployeesActionsReportXlsxMockFn = (employeeId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetEmployeesActionsReportApiPath(employeeId))

export const mockGetEmployeesActionsReportXlsxSuccess = (
  employeeId: IdType,
  options?: Partial<ResponseResolverOptions<GetEmployeesActionsReportXlsxResponse>>,
) => getSuccessMockFn(getEmployeesActionsReportXlsxMockFn(employeeId), options)()

export const mockGetEmployeesActionsReportXlsxForbiddenError = (
  employeeId: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEmployeesActionsReportXlsxMockFn(employeeId), options)()

export const mockGetEmployeesActionsReportXlsxNotFoundError = (
  employeeId: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getEmployeesActionsReportXlsxMockFn(employeeId), options)()

export const mockGetEmployeesActionsReportXlsxServerError = (
  employeeId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEmployeesActionsReportXlsxMockFn(employeeId), options)()
