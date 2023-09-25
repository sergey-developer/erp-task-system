import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'

import { BooleanKey, BooleanMap, Nullable } from 'shared/types/utils'

export const checkEquipmentCategory = (
  category: Nullable<EquipmentCategoryEnum>,
): BooleanMap<BooleanKey<keyof typeof EquipmentCategoryEnum>> => ({
  isEquipment: category === EquipmentCategoryEnum.Equipment,
  isConsumable: category === EquipmentCategoryEnum.Consumable,
  isCoreResources: category === EquipmentCategoryEnum.CoreResources,
})
