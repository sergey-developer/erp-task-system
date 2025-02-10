import { Base64Type } from 'shared/types/common'

import { GetEmployeesActionsReportQueryArgs } from './getEmployeesActionsReport.schema'

export type GetEmployeesActionsReportXlsxQueryArgs = Omit<
  GetEmployeesActionsReportQueryArgs,
  'limit' | 'offset'
>

export type GetEmployeesActionsReportXlsxSuccessResponse = Base64Type
