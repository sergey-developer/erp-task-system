import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { IdType } from 'shared/types/common'

import { EmployeesActionsReportItemDTO } from '../dto'

export type GetEmployeesActionsReportRequest = { employeeId: IdType } & PaginationRequestParams &
  Partial<{
    actionFrom: string
    actionTo: string
  }>

export type GetEmployeesActionsReportResponse =
  PaginationResponse<EmployeesActionsReportItemDTO>
