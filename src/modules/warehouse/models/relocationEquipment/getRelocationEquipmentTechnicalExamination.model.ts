import { BaseRelocationEquipmentRequestArgs } from 'modules/warehouse/types'

import { MaybeUndefined } from 'shared/types/utils'

import { RelocationEquipmentTechnicalExaminationModel } from './relocationEquipmentTechnicalExamination.model'

export type GetRelocationEquipmentTechnicalExaminationQueryArgs = BaseRelocationEquipmentRequestArgs

export type GetRelocationEquipmentTechnicalExaminationSuccessResponse =
  MaybeUndefined<RelocationEquipmentTechnicalExaminationModel>
