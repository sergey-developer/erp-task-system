import { EquipmentCategoryEnum } from 'features/warehouse/constants/equipment'
import { EquipmentCategoryModel } from 'features/warehouse/models'

import { FieldsMaybeHidden } from './types'

export const getHiddenFieldsByCategory = (
  category: EquipmentCategoryModel,
): FieldsMaybeHidden[] => {
  if (!category.code) return []

  switch (category.code) {
    case EquipmentCategoryEnum.Consumable:
      return ['inventoryNumber', 'isNew', 'isWarranty', 'isRepaired', 'usageCounter', 'owner']
    case EquipmentCategoryEnum.Equipment:
    case EquipmentCategoryEnum.CoreResources:
      return []
  }
}
