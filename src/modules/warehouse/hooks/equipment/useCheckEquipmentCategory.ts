import { useMemo } from 'react'

import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'

import { BooleanKey, BooleanMap, Nullable } from 'shared/types/utils'

export const useCheckEquipmentCategory = (
  category: Nullable<EquipmentCategoryEnum>,
): BooleanMap<BooleanKey<keyof typeof EquipmentCategoryEnum>> => {
  return useMemo(
    () => ({
      isEquipment: category === EquipmentCategoryEnum.Equipment,
      isConsumable: category === EquipmentCategoryEnum.Consumable,
      isCoreResources: category === EquipmentCategoryEnum.CoreResources,
    }),
    [category],
  )
}
