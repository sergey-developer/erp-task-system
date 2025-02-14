import { EquipmentsApiPathsEnum } from 'features/equipments/api/constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const makeGetEquipmentApiPath = (id: IdType): string =>
  generateApiPath(EquipmentsApiPathsEnum.GetEquipment, { id: String(id) })

export const makeGetEquipmentAttachmentsApiPath = (id: IdType): string =>
  generateApiPath(EquipmentsApiPathsEnum.GetEquipmentAttachments, { id: String(id) })

export const makeUpdateEquipmentApiPath = (id: IdType): string =>
  generateApiPath(EquipmentsApiPathsEnum.UpdateEquipment, { id: String(id) })

export const makeGetEquipmentRelocationHistoryApiPath = (id: IdType): string =>
  generateApiPath(EquipmentsApiPathsEnum.GetEquipmentRelocationHistory, { id: String(id) })
