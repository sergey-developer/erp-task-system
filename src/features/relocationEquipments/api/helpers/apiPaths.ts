import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

import { RelocationEquipmentsApiPathsEnum } from '../constants'

export const makeGetRelocationEquipmentAttachmentsApiPath = (id: IdType): string =>
  generateApiPath(RelocationEquipmentsApiPathsEnum.GetRelocationEquipmentAttachments, {
    id: String(id),
  })

export const makeGetRelocationEquipmentTechnicalExaminationApiPath = (id: IdType): string =>
  generateApiPath(RelocationEquipmentsApiPathsEnum.GetTechnicalExamination, { id: String(id) })

export const makeCreateRelocationEquipmentTechnicalExaminationApiPath = (id: IdType): string =>
  generateApiPath(RelocationEquipmentsApiPathsEnum.CreateTechnicalExamination, { id: String(id) })
