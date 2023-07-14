import { generatePath } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

export const getWarehousePageLink = (id: number): string =>
  generatePath(RouteEnum.Warehouse, {
    id: String(id),
  })
