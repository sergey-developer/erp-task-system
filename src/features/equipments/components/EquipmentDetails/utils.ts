import { EquipmentCategoryEnum } from 'features/equipments/api/constants'
import { EquipmentCategoryDTO } from 'features/equipments/api/dto'

import { FieldsMaybeHidden } from './types'

export const getHiddenFieldsByCategory = (category: EquipmentCategoryDTO): FieldsMaybeHidden[] => {
  if (!category.code) return []

  switch (category.code) {
    case EquipmentCategoryEnum.Consumable:
      return ['inventoryNumber', 'isNew', 'isWarranty', 'isRepaired', 'usageCounter', 'owner']
    case EquipmentCategoryEnum.Equipment:
    case EquipmentCategoryEnum.CoreResources:
      return []
  }
}
