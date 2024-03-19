import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type RelocationEquipmentTechnicalExaminationModel = {
  id: IdType
  relocationEquipment: {
    id: IdType
    equipment: {
      id: IdType
      title: string
      serialNumber: string
      inventoryNumber: MaybeNull<string>
    }
  }
  malfunction: string
  hasMechanicalDamage: boolean
  restorationAction: string
  restorationCost: number
  conclusion: MaybeNull<string>
}
