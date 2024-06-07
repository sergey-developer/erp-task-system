import { InventorizationApiEnum } from 'modules/warehouse/constants/inventorization'
import {
  InventorizationEquipmentRequestArgs,
  InventorizationRequestArgs,
} from 'modules/warehouse/types'

import { generateApiPath } from 'shared/utils/api'

export const makeGetInventorizationUrl = ({
  inventorizationId,
}: Pick<InventorizationRequestArgs, 'inventorizationId'>): string =>
  generateApiPath(InventorizationApiEnum.GetInventorization, { id: String(inventorizationId) })

export const makeCompleteInventorizationUrl = ({
  inventorizationId,
}: Pick<InventorizationRequestArgs, 'inventorizationId'>): string =>
  generateApiPath(InventorizationApiEnum.CompleteInventorization, { id: String(inventorizationId) })

export const makeGetInventorizationEquipmentsUrl = ({
  inventorizationId,
}: Pick<InventorizationRequestArgs, 'inventorizationId'>): string =>
  generateApiPath(InventorizationApiEnum.GetInventorizationEquipments, {
    id: String(inventorizationId),
  })

export const makeUpdateInventorizationEquipmentUrl = ({
  inventorizationEquipmentId,
}: Pick<InventorizationEquipmentRequestArgs, 'inventorizationEquipmentId'>): string =>
  generateApiPath(InventorizationApiEnum.UpdateInventorizationEquipment, {
    inventorizationEquipmentId: String(inventorizationEquipmentId),
  })
