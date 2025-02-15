import { WarehousesApiPathsEnum } from '../constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const makeGetWarehouseApiPath = (id: IdType): string =>
  generateApiPath(WarehousesApiPathsEnum.GetWarehouse, { id: String(id) })
