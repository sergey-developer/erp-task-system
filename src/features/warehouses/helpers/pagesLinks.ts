import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import { generatePath } from 'react-router-dom'

import { IdType } from 'shared/types/common'

export const makeWarehousePageLink = (id: IdType, title?: string): string => {
  const link = generatePath(WarehousesRoutesEnum.Warehouse, { id: String(id) })
  return title ? `${link}?warehouseTitle=${title}` : link
}
