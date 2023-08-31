import { generatePath } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

export const getWarehousePageLink = (id: number): string =>
  generatePath(RouteEnum.Warehouse, { id: String(id) })

export const getEquipmentListPageLink = (id: number): string =>
  generatePath(RouteEnum.EquipmentList, { id: String(id) })
