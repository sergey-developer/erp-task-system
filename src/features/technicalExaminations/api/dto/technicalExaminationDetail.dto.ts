import { EquipmentDetailDTO } from 'features/equipments/api/dto'
import { RelocationEquipmentListItemModel } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull, SetNonNullable } from 'shared/types/utils'

export type TechnicalExaminationDetailDTO = {
  id: IdType
  malfunction: string
  hasMechanicalDamage: boolean
  restorationAction: string
  restorationCost: number

  conclusion: MaybeNull<string>
  relocationEquipment: MaybeNull<Pick<RelocationEquipmentListItemModel, 'id'>>
  equipment: MaybeNull<
    SetNonNullable<EquipmentDetailDTO, 'id' | 'title' | 'serialNumber'> &
      Pick<EquipmentDetailDTO, 'inventoryNumber'>
  >
}
