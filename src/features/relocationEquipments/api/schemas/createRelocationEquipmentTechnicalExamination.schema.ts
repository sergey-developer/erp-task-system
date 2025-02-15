import { RelocationEquipmentTechnicalExaminationDTO } from '../dto'
import { RequestWithRelocationEquipment } from '../types'

export type CreateRelocationEquipmentTechnicalExaminationRequest =
  RequestWithRelocationEquipment & {
    malfunction: string
    hasMechanicalDamage: boolean
    restorationAction: string
    restorationCost: number
    conclusion?: string
  }

export type CreateRelocationEquipmentTechnicalExaminationResponse =
  RelocationEquipmentTechnicalExaminationDTO
