import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import { InventorizationRequestArgs } from 'modules/warehouse/types'

export const getExecuteInventorizationPageLink = ({
  inventorizationId,
}: Pick<InventorizationRequestArgs, 'inventorizationId'>): string =>
  generatePath(WarehouseRouteEnum.ExecuteInventorization, { id: String(inventorizationId) })
