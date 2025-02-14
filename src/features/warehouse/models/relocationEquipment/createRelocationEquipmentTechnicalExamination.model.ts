import { RequestWithRelocationEquipment } from 'features/warehouse/types'

import { RelocationEquipmentTechnicalExaminationModel } from './relocationEquipmentTechnicalExamination.model'

export type CreateRelocationEquipmentTechnicalExaminationRequest =
  RequestWithRelocationEquipment & {
    malfunction: string
    hasMechanicalDamage: boolean
    restorationAction: string
    restorationCost: number
    conclusion?: string
  }

export type CreateRelocationEquipmentTechnicalExaminationResponse =
  RelocationEquipmentTechnicalExaminationModel
