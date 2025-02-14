import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { EquipmentDetailDTO } from '../dto'

export type CreateEquipmentTechnicalExaminationRequest = {
  equipment: IdType
  malfunction: string
  hasMechanicalDamage: boolean
  restorationAction: string
  restorationCost: number
  conclusion?: string
}

export type CreateEquipmentTechnicalExaminationResponse = {
  id: IdType
  malfunction: string
  hasMechanicalDamage: boolean
  restorationAction: string
  restorationCost: number
  conclusion: MaybeNull<string>
  equipment: MaybeNull<Pick<EquipmentDetailDTO, 'id' | 'title'>>
}
