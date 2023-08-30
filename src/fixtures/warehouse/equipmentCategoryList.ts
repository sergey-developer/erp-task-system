import times from 'lodash/times'

import {
  EquipmentCategoryListItemModel,
  EquipmentCategoryListModel,
} from 'modules/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const equipmentCategoryListItem =
  (): EquipmentCategoryListItemModel => ({
    id: fakeId(),
    title: fakeWord(),
    code: fakeWord(),
  })

export const equipmentCategoryList = (
  length: number = 1,
): EquipmentCategoryListModel =>
  times(length, () => equipmentCategoryListItem())
