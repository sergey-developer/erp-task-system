import { AxiosResponse } from 'axios'
import {
  EmployeesActionsReportItemDTO,
  GetEmployeesActionsReportXlsxSuccessResponse,
} from 'features/reports/api/dto'

import { AntdPaginatedList } from 'lib/antd/types'

export type GetEmployeesActionsReportTransformedSuccessResponse =
  AntdPaginatedList<EmployeesActionsReportItemDTO>

export type GetEmployeesActionsReportXlsxTransformedSuccessResponse = {
  value: GetEmployeesActionsReportXlsxSuccessResponse
  meta?: { response?: AxiosResponse }
}
