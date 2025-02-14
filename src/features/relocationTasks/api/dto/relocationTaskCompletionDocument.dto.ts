import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentDetailDTO } from 'features/equipments/api/dto'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type RelocationTaskCompletionDocumentDTO = {
  id: IdType
  relocateFrom: MaybeNull<{
    id: IdType
    title: string
  }>
  relocateTo: MaybeNull<{
    id: IdType
    title: string
  }>
  relocationEquipments: {
    id: IdType
    condition: EquipmentConditionEnum
    equipment: Pick<EquipmentDetailDTO, 'id' | 'title' | 'serialNumber' | 'inventoryNumber'>
  }[]
}
