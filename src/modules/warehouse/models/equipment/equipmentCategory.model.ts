import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type EquipmentCategoryModel = {
  id: IdType
  title: string
  code: MaybeNull<EquipmentCategoryEnum>
}
