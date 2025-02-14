import { AxiosResponse } from 'axios'
import { EmployeesActionsReportItemDTO } from 'features/reports/api/dto'
import { GetEmployeesActionsReportXlsxResponse } from 'features/reports/api/schemas'

import { AntdPagination } from 'lib/antd/types'

export type GetEmployeesActionsReportTransformedResponse =
  AntdPagination<EmployeesActionsReportItemDTO>

export type GetEmployeesActionsReportXlsxTransformedResponse = {
  value: GetEmployeesActionsReportXlsxResponse
  meta?: { response?: AxiosResponse }
}
