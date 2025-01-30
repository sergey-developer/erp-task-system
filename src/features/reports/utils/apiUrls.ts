import { ReportsApiEnum } from 'features/reports/constants'
import { InventorizationRequestArgs } from 'features/warehouse/types'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getEmployeesActionsReportUrl = (employeeId: IdType): string =>
  generateApiPath(ReportsApiEnum.GetEmployeesActionsReport, { id: String(employeeId) })

export const getHistoryNomenclatureOperationsReportUrl = (nomenclatureId: IdType): string =>
  generateApiPath(ReportsApiEnum.GetHistoryNomenclatureOperationsReport, {
    id: String(nomenclatureId),
  })

export const makeGetInventorizationReportUrl = ({
  inventorizationId,
}: InventorizationRequestArgs): string =>
  generateApiPath(ReportsApiEnum.GetInventorizationReport, {
    inventorizationId: String(inventorizationId),
  })
