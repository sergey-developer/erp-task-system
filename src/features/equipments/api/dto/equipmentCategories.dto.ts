import { EquipmentCategoryEnum } from 'features/equipments/api/constants'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type EquipmentCategoryDTO = {
  id: IdType
  title: string
  code: MaybeNull<EquipmentCategoryEnum>
}

export type EquipmentCategoriesDTO = EquipmentCategoryDTO[]
