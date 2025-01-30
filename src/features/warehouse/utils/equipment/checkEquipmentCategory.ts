import { EquipmentCategoryEnum } from 'features/warehouse/constants/equipment'

import { Nullable } from 'shared/types/utils'

export const checkEquipmentCategoryIsConsumable = (
  category: Nullable<EquipmentCategoryEnum>,
): category is EquipmentCategoryEnum.Consumable => category === EquipmentCategoryEnum.Consumable
