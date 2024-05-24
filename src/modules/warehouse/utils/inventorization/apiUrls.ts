import { InventorizationApiEnum } from 'modules/warehouse/constants/inventorization'
import { InventorizationRequestArgs } from 'modules/warehouse/types'

import { generateApiPath } from 'shared/utils/api'

export const getInventorizationUrl = ({
  inventorizationId,
}: Pick<InventorizationRequestArgs, 'inventorizationId'>): string =>
  generateApiPath(InventorizationApiEnum.GetInventorization, { id: String(inventorizationId) })

export const getInventorizationEquipmentsUrl = ({
  inventorizationId,
}: Pick<InventorizationRequestArgs, 'inventorizationId'>): string =>
  generateApiPath(InventorizationApiEnum.GetInventorizationEquipments, {
    id: String(inventorizationId),
  })
