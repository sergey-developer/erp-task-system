import { generatePath } from 'react-router-dom'

import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'

import { IdType } from 'shared/types/common'

export const getWarehousePageLink = (id: IdType, title?: string): string => {
  const link = generatePath(WarehouseRouteEnum.Warehouse, { id: String(id) })
  return title ? `${link}?warehouseTitle=${title}` : link
}
