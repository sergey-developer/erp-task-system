import { WarehouseApiEnum } from 'features/warehouse/constants/warehouse'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getWarehouseUrl = (id: IdType): string =>
  generateApiPath(WarehouseApiEnum.GetWarehouse, { id: String(id) })
