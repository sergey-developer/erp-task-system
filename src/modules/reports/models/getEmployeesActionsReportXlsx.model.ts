import { GetEmployeesActionsReportQueryArgs } from './getEmployeesActionsReport.model'

export type GetEmployeesActionsReportXlsxQueryArgs = Omit<
  GetEmployeesActionsReportQueryArgs,
  'limit' | 'offset'
>

export type GetEmployeesActionsReportXlsxSuccessResponse = Blob
