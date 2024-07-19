import { EquipmentModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type CreateEquipmentTechnicalExaminationMutationArgs = {
  equipment: IdType
  malfunction: string
  hasMechanicalDamage: boolean
  restorationAction: string
  restorationCost: number
  conclusion?: string
}

export type CreateEquipmentTechnicalExaminationSuccessResponse = {
  id: IdType
  malfunction: string
  hasMechanicalDamage: boolean
  restorationAction: string
  restorationCost: number
  conclusion: MaybeNull<string>
  equipment: MaybeNull<Pick<EquipmentModel, 'id' | 'title'>>
}
