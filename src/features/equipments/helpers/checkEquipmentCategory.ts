import { EquipmentCategoryEnum } from 'features/equipments/api/constants'

import { Nullable } from 'shared/types/utils'

export const checkEquipmentCategoryIsConsumable = (
  category: Nullable<EquipmentCategoryEnum>,
): category is EquipmentCategoryEnum.Consumable => category === EquipmentCategoryEnum.Consumable
