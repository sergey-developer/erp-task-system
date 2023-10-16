import times from 'lodash/times'

import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'
import {
  EquipmentCategoryListItemModel,
  EquipmentCategoryListModel,
} from 'modules/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const equipmentCategoryListItem = (
  props?: Partial<Pick<EquipmentCategoryListItemModel, 'code'>>,
): EquipmentCategoryListItemModel => ({
  code: props?.code || EquipmentCategoryEnum.Equipment,

  id: fakeId(),
  title: fakeWord(),
})

export const equipmentCategoryList = (length: number = 1): EquipmentCategoryListModel =>
  times(length, () => equipmentCategoryListItem())
