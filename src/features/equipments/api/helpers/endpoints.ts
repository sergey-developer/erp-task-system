import { EquipmentsEndpointsEnum } from 'features/equipments/api/constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const makeGetEquipmentEndpoint = (id: IdType): string =>
  generateApiPath(EquipmentsEndpointsEnum.GetEquipment, { id: String(id) })

export const makeGetEquipmentAttachmentsEndpoint = (id: IdType): string =>
  generateApiPath(EquipmentsEndpointsEnum.GetEquipmentAttachments, { id: String(id) })

export const makeUpdateEquipmentEndpoint = (id: IdType): string =>
  generateApiPath(EquipmentsEndpointsEnum.UpdateEquipment, { id: String(id) })

export const makeGetEquipmentRelocationHistoryEndpoint = (id: IdType): string =>
  generateApiPath(EquipmentsEndpointsEnum.GetEquipmentRelocationHistory, { id: String(id) })
