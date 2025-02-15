import { EquipmentDetailDTO } from 'features/equipments/api/dto'
import { RelocationEquipmentDTO } from 'features/relocationTasks/api/dto'

import { IdType } from 'shared/types/common'
import { MaybeNull, SetNonNullable } from 'shared/types/utils'

export type TechnicalExaminationDetailDTO = {
  id: IdType
  malfunction: string
  hasMechanicalDamage: boolean
  restorationAction: string
  restorationCost: number

  conclusion: MaybeNull<string>
  relocationEquipment: MaybeNull<Pick<RelocationEquipmentDTO, 'id'>>
  equipment: MaybeNull<
    SetNonNullable<EquipmentDetailDTO, 'id' | 'title' | 'serialNumber'> &
      Pick<EquipmentDetailDTO, 'inventoryNumber'>
  >
}
