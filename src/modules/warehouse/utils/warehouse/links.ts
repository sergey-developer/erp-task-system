import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

import { IdType } from 'shared/types/common'

export const getWarehousePageLink = (id: IdType): string =>
  generatePath(WarehouseRouteEnum.Warehouse, { id: String(id) })
