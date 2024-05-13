import { RelocationEquipmentRequestArgs } from 'modules/warehouse/types'

import { RelocationEquipmentTechnicalExaminationModel } from './relocationEquipmentTechnicalExamination.model'

export type CreateRelocationEquipmentTechnicalExaminationMutationArgs =
  RelocationEquipmentRequestArgs & {
    malfunction: string
    hasMechanicalDamage: boolean
    restorationAction: string
    restorationCost: number
    conclusion?: string
  }

export type CreateRelocationEquipmentTechnicalExaminationSuccessResponse =
  RelocationEquipmentTechnicalExaminationModel
