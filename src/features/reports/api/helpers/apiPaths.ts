import { RequestWithInventorization } from 'features/inventorizations/api/types'
import { ReportsApiPathsEnum } from 'features/reports/api/constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const makeGetEmployeesActionsReportApiPath = (employeeId: IdType): string =>
  generateApiPath(ReportsApiPathsEnum.GetEmployeesActionsReport, { id: String(employeeId) })

export const makeHistoryNomenclatureOperationsReportApiPath = (nomenclatureId: IdType): string =>
  generateApiPath(ReportsApiPathsEnum.GetHistoryNomenclatureOperationsReport, {
    id: String(nomenclatureId),
  })

export const makeGetInventorizationReportApiPath = ({
  inventorizationId,
}: RequestWithInventorization): string =>
  generateApiPath(ReportsApiPathsEnum.GetInventorizationReport, {
    inventorizationId: String(inventorizationId),
  })
