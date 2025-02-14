import { RelocationEquipmentRequestArgs } from 'features/warehouse/types'

import { MaybeUndefined } from 'shared/types/utils'

import { RelocationEquipmentTechnicalExaminationModel } from './relocationEquipmentTechnicalExamination.model'

export type GetRelocationEquipmentTechnicalExaminationRequest = RelocationEquipmentRequestArgs

export type GetRelocationEquipmentTechnicalExaminationResponse =
  MaybeUndefined<RelocationEquipmentTechnicalExaminationModel>
