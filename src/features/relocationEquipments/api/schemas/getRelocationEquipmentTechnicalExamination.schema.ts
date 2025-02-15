import { MaybeUndefined } from 'shared/types/utils'

import { RelocationEquipmentTechnicalExaminationDTO } from '../dto'
import { RequestWithRelocationEquipment } from '../types'

export type GetRelocationEquipmentTechnicalExaminationRequest = RequestWithRelocationEquipment

export type GetRelocationEquipmentTechnicalExaminationResponse =
  MaybeUndefined<RelocationEquipmentTechnicalExaminationDTO>
