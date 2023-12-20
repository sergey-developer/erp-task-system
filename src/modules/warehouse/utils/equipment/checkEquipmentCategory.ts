import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'

import { Nullable } from 'shared/types/utils'

export const checkEquipmentCategoryIsConsumable = (
  category: Nullable<EquipmentCategoryEnum>,
): boolean => category === EquipmentCategoryEnum.Consumable
