import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { IdType } from 'shared/types/common'

export const getExecuteInventorizationPageLink = (inventorizationId: IdType): string =>
  generatePath(WarehouseRouteEnum.ExecuteInventorization, { id: String(inventorizationId) })
