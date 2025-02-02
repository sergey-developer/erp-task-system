import { PaginationParams, PaginationResponse } from 'shared/dto/api/pagination.dto'
import { IdType } from 'shared/types/common'

import { EmployeesActionsReportListItemModel } from './employeesActionsReport.model'

export type GetEmployeesActionsReportQueryArgs = { employeeId: IdType } & PaginationParams &
  Partial<{
    actionFrom: string
    actionTo: string
  }>

export type GetEmployeesActionsReportSuccessResponse =
  PaginationResponse<EmployeesActionsReportListItemModel>
