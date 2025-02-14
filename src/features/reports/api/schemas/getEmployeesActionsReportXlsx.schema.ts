import { Base64Type } from 'shared/types/common'

import { GetEmployeesActionsReportRequest } from './getEmployeesActionsReport.schema'

export type GetEmployeesActionsReportXlsxRequest = Omit<
  GetEmployeesActionsReportRequest,
  'limit' | 'offset'
>

export type GetEmployeesActionsReportXlsxResponse = Base64Type
