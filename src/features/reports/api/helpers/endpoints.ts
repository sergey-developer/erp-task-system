import { ReportsEndpointsEnum } from 'features/reports/api/constants'
import { RequestWithInventorization } from 'features/warehouse/types'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const makeGetEmployeesActionsReportEndpoint = (employeeId: IdType): string =>
  generateApiPath(ReportsEndpointsEnum.GetEmployeesActionsReport, { id: String(employeeId) })

export const makeHistoryNomenclatureOperationsReportEndpoint = (nomenclatureId: IdType): string =>
  generateApiPath(ReportsEndpointsEnum.GetHistoryNomenclatureOperationsReport, {
    id: String(nomenclatureId),
  })

export const makeGetInventorizationReportEndpoint = ({
  inventorizationId,
}: RequestWithInventorization): string =>
  generateApiPath(ReportsEndpointsEnum.GetInventorizationReport, {
    inventorizationId: String(inventorizationId),
  })
