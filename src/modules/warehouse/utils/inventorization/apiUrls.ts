import { InventorizationApiEnum } from 'modules/warehouse/constants/inventorization'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getInventorizationUrl = (id: IdType): string =>
  generateApiPath(InventorizationApiEnum.GetInventorization, { id: String(id) })
