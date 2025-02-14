import { WarehousesApiPathsEnum } from 'features/warehouse/constants/warehouse'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getWarehouseApiPath = (id: IdType): string =>
  generateApiPath(WarehousesApiPathsEnum.GetWarehouse, { id: String(id) })
