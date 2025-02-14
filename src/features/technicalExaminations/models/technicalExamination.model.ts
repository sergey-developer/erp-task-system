import { EquipmentDetailDTO } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull, SetNonNullable } from 'shared/types/utils'

export type TechnicalExaminationModel = {
  id: IdType
  malfunction: string
  hasMechanicalDamage: boolean
  restorationAction: string
  restorationCost: number

  conclusion: MaybeNull<string>
  relocationEquipment: MaybeNull<{
    id: IdType
  }>
  equipment: MaybeNull<
    SetNonNullable<EquipmentDetailDTO, 'id' | 'title' | 'serialNumber'> &
      Pick<EquipmentDetailDTO, 'inventoryNumber'>
  >
}
