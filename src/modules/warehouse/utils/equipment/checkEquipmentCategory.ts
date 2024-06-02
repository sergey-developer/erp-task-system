import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'

import { Nullable } from 'shared/types/utils'

export const checkEquipmentCategoryIsConsumable = (
  category: Nullable<EquipmentCategoryEnum>,
): category is EquipmentCategoryEnum.Consumable => category === EquipmentCategoryEnum.Consumable
