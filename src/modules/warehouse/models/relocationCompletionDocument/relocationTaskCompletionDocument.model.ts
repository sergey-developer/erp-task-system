import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type RelocationTaskCompletionDocumentModel = {
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
    equipment: Pick<EquipmentModel, 'id' | 'title' | 'serialNumber'>
  }[]
}
