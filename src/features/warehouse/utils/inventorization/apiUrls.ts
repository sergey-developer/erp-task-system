import { InventorizationsEndpointsEnum } from 'features/inventorizations/constants'
import {
  RequestWithEquipment,
  RequestWithInventorization,
  RequestWithInventorizationEquipment,
} from 'features/warehouse/types'

import { generateApiPath } from 'shared/utils/api'

export const makeGetInventorizationUrl = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>): string =>
  generateApiPath(InventorizationsEndpointsEnum.GetInventorization, {
    id: String(inventorizationId),
  })

export const makeCompleteInventorizationUrl = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>): string =>
  generateApiPath(InventorizationsEndpointsEnum.CompleteInventorization, {
    id: String(inventorizationId),
  })

export const makeGetInventorizationEquipmentsUrl = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>): string =>
  generateApiPath(InventorizationsEndpointsEnum.GetInventorizationEquipments, {
    inventorizationId: String(inventorizationId),
  })

export const makeGetInventorizationEquipmentUrl = ({
  equipmentId,
}: Pick<RequestWithEquipment, 'equipmentId'>): string =>
  generateApiPath(InventorizationsEndpointsEnum.GetInventorizationEquipment, {
    equipmentId: String(equipmentId),
  })

export const makeCreateInventorizationEquipmentUrl = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>): string =>
  generateApiPath(InventorizationsEndpointsEnum.CreateInventorizationEquipment, {
    inventorizationId: String(inventorizationId),
  })

export const makeUpdateInventorizationEquipmentUrl = ({
  inventorizationEquipmentId,
}: Pick<RequestWithInventorizationEquipment, 'inventorizationEquipmentId'>): string =>
  generateApiPath(InventorizationsEndpointsEnum.UpdateInventorizationEquipment, {
    inventorizationEquipmentId: String(inventorizationEquipmentId),
  })
