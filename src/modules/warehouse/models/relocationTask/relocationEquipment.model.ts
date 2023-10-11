import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type RelocationEquipmentModel = {
  id: IdType
  title: string
  condition: EquipmentConditionEnum
  purpose: string
  quantity: number

  price: MaybeNull<number>
  currency: MaybeNull<number>
  serialNumber: MaybeNull<string>
}
