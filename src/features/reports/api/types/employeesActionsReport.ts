import { AxiosResponse } from 'axios'
import { EmployeesActionsReportItemDTO } from 'features/reports/api/dto'
import { GetEmployeesActionsReportXlsxSuccessResponse } from 'features/reports/api/schemas'

import { AntdPaginatedList } from 'lib/antd/types'

export type GetEmployeesActionsReportTransformedSuccessResponse =
  AntdPaginatedList<EmployeesActionsReportItemDTO>

export type GetEmployeesActionsReportXlsxTransformedSuccessResponse = {
  value: GetEmployeesActionsReportXlsxSuccessResponse
  meta?: { response?: AxiosResponse }
}
