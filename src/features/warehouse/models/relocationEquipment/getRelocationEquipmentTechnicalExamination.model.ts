import { RequestWithRelocationEquipment } from 'features/warehouse/types'

import { MaybeUndefined } from 'shared/types/utils'

import { RelocationEquipmentTechnicalExaminationModel } from './relocationEquipmentTechnicalExamination.model'

export type GetRelocationEquipmentTechnicalExaminationRequest = RequestWithRelocationEquipment

export type GetRelocationEquipmentTechnicalExaminationResponse =
  MaybeUndefined<RelocationEquipmentTechnicalExaminationModel>
