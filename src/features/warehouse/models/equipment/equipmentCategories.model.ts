import { EquipmentCategoryEnum } from 'features/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type EquipmentCategoryListItemModel = {
  id: IdType
  title: string
  code: MaybeNull<EquipmentCategoryEnum>
}

export type EquipmentCategoriesModel = EquipmentCategoryListItemModel[]
