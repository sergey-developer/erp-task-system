import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'

import { BooleanKey, BooleanMap, Nullable } from 'shared/types/utils'

export const checkEquipmentCategoryIsConsumable = (
  category: Nullable<EquipmentCategoryEnum>,
): boolean => category === EquipmentCategoryEnum.Consumable

export const checkEquipmentCategory = (
  category: Nullable<EquipmentCategoryEnum>,
): BooleanMap<BooleanKey<keyof typeof EquipmentCategoryEnum>> => ({
  isEquipment: category === EquipmentCategoryEnum.Equipment,
  isConsumable: checkEquipmentCategoryIsConsumable(category),
  isCoreResources: category === EquipmentCategoryEnum.CoreResources,
})
