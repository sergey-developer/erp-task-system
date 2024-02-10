import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

import { EmployeesReportsApiEnum } from '../constants'

export const getEmployeesActionsReportUrl = (employeeId: IdType): string =>
  generateApiPath(EmployeesReportsApiEnum.GetEmployeesActionsReport, { id: String(employeeId) })
