import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

import { ReportsApiEnum } from '../constants'

export const getEmployeesActionsReportUrl = (employeeId: IdType): string =>
  generateApiPath(ReportsApiEnum.GetEmployeesActionsReport, { id: String(employeeId) })
