import { RelocationEquipmentApiEnum } from 'features/warehouse/constants/relocationEquipment'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getRelocationEquipmentAttachmentListUrl = (id: IdType): string =>
  generateApiPath(RelocationEquipmentApiEnum.GetRelocationEquipmentAttachments, {
    id: String(id),
  })

export const getRelocationEquipmentTechnicalExaminationUrl = (id: IdType): string =>
  generateApiPath(RelocationEquipmentApiEnum.GetTechnicalExamination, { id: String(id) })

export const createRelocationEquipmentTechnicalExaminationUrl = (id: IdType): string =>
  generateApiPath(RelocationEquipmentApiEnum.CreateTechnicalExamination, { id: String(id) })
