import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentCategoryModel } from 'modules/warehouse/models'

import { FieldsMaybeHidden } from './types'

export const getHiddenFieldsByCategory = (
  category: EquipmentCategoryModel,
): FieldsMaybeHidden[] => {
  if (!category.code) return []

  switch (category.code) {
    case EquipmentCategoryEnum.Consumable:
      return [
        'customerInventoryNumber',
        'inventoryNumber',
        'isNew',
        'isWarranty',
        'isRepaired',
        'usageCounter',
        'owner',
      ]
    case EquipmentCategoryEnum.Equipment:
    case EquipmentCategoryEnum.CoreResources:
      return []
  }
}
