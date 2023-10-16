import { useMemo } from 'react'

import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'
import { checkEquipmentCategory } from 'modules/warehouse/utils/equipment'

import { BooleanKey, BooleanMap, Nullable } from 'shared/types/utils'

export const useCheckEquipmentCategory = (
  category: Nullable<EquipmentCategoryEnum>,
): BooleanMap<BooleanKey<keyof typeof EquipmentCategoryEnum>> => {
  return useMemo(() => checkEquipmentCategory(category), [category])
}
