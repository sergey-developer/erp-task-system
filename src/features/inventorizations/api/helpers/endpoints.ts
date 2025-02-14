import { RequestWithEquipment } from 'features/equipments/api/types'

import { generateApiPath } from 'shared/utils/api'

import { InventorizationsApiPathsEnum } from '../constants'
import { RequestWithInventorization, RequestWithInventorizationEquipment } from '../types'

export const makeGetInventorizationApiPath = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>): string =>
  generateApiPath(InventorizationsApiPathsEnum.GetInventorization, {
    id: String(inventorizationId),
  })

export const makeCompleteInventorizationApiPath = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>): string =>
  generateApiPath(InventorizationsApiPathsEnum.CompleteInventorization, {
    id: String(inventorizationId),
  })

export const makeGetInventorizationEquipmentsApiPath = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>): string =>
  generateApiPath(InventorizationsApiPathsEnum.GetInventorizationEquipments, {
    inventorizationId: String(inventorizationId),
  })

export const makeGetInventorizationEquipmentApiPath = ({
  equipmentId,
}: Pick<RequestWithEquipment, 'equipmentId'>): string =>
  generateApiPath(InventorizationsApiPathsEnum.GetInventorizationEquipment, {
    equipmentId: String(equipmentId),
  })

export const makeCreateInventorizationEquipmentApiPath = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>): string =>
  generateApiPath(InventorizationsApiPathsEnum.CreateInventorizationEquipment, {
    inventorizationId: String(inventorizationId),
  })

export const makeUpdateInventorizationEquipmentApiPath = ({
  inventorizationEquipmentId,
}: Pick<RequestWithInventorizationEquipment, 'inventorizationEquipmentId'>): string =>
  generateApiPath(InventorizationsApiPathsEnum.UpdateInventorizationEquipment, {
    inventorizationEquipmentId: String(inventorizationEquipmentId),
  })
