import { generatePath } from 'react-router-dom'

import { WarehouseApiEnum } from 'modules/warehouse/services/warehouseApiService'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const getWarehouseUrl = (id: IdType): string =>
  appendSlashAtEnd(generatePath(WarehouseApiEnum.GetWarehouse, { id: String(id) }))
