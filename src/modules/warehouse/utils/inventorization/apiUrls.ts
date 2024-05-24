import { InventorizationApiEnum } from 'modules/warehouse/constants/inventorization'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getInventorizationUrl = (inventorizationId: IdType): string =>
  generateApiPath(InventorizationApiEnum.GetInventorization, { id: String(inventorizationId) })

export const getInventorizationEquipmentsUrl = (inventorizationId: IdType): string =>
  generateApiPath(InventorizationApiEnum.GetInventorizationEquipments, {
    id: String(inventorizationId),
  })
