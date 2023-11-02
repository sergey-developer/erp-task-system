import { EquipmentApiEnum } from 'modules/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getEquipmentUrl = (id: IdType): string =>
  generateApiPath(EquipmentApiEnum.GetEquipment, { id: String(id) })

export const getEquipmentAttachmentListUrl = (id: IdType): string =>
  generateApiPath(EquipmentApiEnum.GetEquipmentAttachmentList, { id: String(id) })

export const updateEquipmentUrl = (id: IdType): string =>
  generateApiPath(EquipmentApiEnum.UpdateEquipment, { id: String(id) })
