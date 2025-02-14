import { RelocationEquipmentRequestArgs } from 'features/warehouse/types'

import { RelocationEquipmentTechnicalExaminationModel } from './relocationEquipmentTechnicalExamination.model'

export type CreateRelocationEquipmentTechnicalExaminationRequest =
  RelocationEquipmentRequestArgs & {
    malfunction: string
    hasMechanicalDamage: boolean
    restorationAction: string
    restorationCost: number
    conclusion?: string
  }

export type CreateRelocationEquipmentTechnicalExaminationResponse =
  RelocationEquipmentTechnicalExaminationModel
