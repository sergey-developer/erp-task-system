import { RelocationEquipmentApiEnum } from 'modules/warehouse/constants/relocationEquipment'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getRelocationEquipmentAttachmentListUrl = (id: IdType): string =>
  generateApiPath(RelocationEquipmentApiEnum.GetRelocationEquipmentAttachmentList, {
    id: String(id),
  })
