import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

import { EmployeeReportsApiEnum } from '../constants'

export const getEmployeesActionsReportUrl = (employeeId: IdType): string =>
  generateApiPath(EmployeeReportsApiEnum.GetEmployeesActionsReport, { id: String(employeeId) })
