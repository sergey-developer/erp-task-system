import { generatePath } from 'react-router-dom'

import { WarehouseApiEnum } from 'modules/warehouse/constants'

import { appendSlashAtEnd } from 'shared/utils/string'

export const getWarehouseUrl = (warehouseId: number): string =>
  appendSlashAtEnd(
    generatePath(WarehouseApiEnum.GetWarehouse, { id: String(warehouseId) }),
  )
