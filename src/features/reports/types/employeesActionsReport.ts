import { AxiosResponse } from 'axios'

import { AntdPaginatedList } from 'lib/antd/types'

import {
  EmployeesActionsReportListItemModel,
  GetEmployeesActionsReportXlsxSuccessResponse,
} from 'features/reports/models'

export type GetEmployeesActionsReportTransformedSuccessResponse =
  AntdPaginatedList<EmployeesActionsReportListItemModel>

export type GetEmployeesActionsReportXlsxTransformedSuccessResponse = {
  value: GetEmployeesActionsReportXlsxSuccessResponse
  meta?: { response?: AxiosResponse }
}
