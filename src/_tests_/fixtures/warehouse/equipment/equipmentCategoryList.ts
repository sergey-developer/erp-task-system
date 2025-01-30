import times from 'lodash/times'

import { EquipmentCategoryEnum } from 'features/warehouse/constants/equipment'
import { EquipmentCategoryListItemModel, EquipmentCategoriesModel } from 'features/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const equipmentCategoryListItem = (
  props?: Partial<Pick<EquipmentCategoryListItemModel, 'code'>>,
): EquipmentCategoryListItemModel => ({
  code: props?.code || EquipmentCategoryEnum.Equipment,

  id: fakeId(),
  title: fakeWord(),
})

export const equipmentCategoryList = (length: number = 1): EquipmentCategoriesModel =>
  times(length, () => equipmentCategoryListItem())
