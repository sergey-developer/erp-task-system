import { PaginationResponse } from 'shared/models/pagination.model'
import { IdType } from 'shared/types/common'
import { PaginationParams } from 'shared/types/pagination'

import { EmployeesActionsReportListItemModel } from './employeesActionsReport.model'

export type GetEmployeesActionsReportQueryArgs = { employeeId: IdType } & Partial<
  PaginationParams & {
    actionFrom: string
    actionTo: string
  }
>

export type GetEmployeesActionsReportSuccessResponse =
  PaginationResponse<EmployeesActionsReportListItemModel>
