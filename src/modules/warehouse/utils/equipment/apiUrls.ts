import { generatePath } from 'react-router-dom'

import { EquipmentApiEnum } from 'modules/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const getEquipmentUrl = (id: IdType): string =>
  appendSlashAtEnd(generatePath(EquipmentApiEnum.GetEquipment, { id: String(id) }))
