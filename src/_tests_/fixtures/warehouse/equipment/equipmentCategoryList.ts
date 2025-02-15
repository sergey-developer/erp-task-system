import { EquipmentCategoryEnum } from 'features/equipments/api/constants'
import { EquipmentCategoriesDTO, EquipmentCategoryDTO } from 'features/equipments/api/dto'
import times from 'lodash/times'

import { fakeId, fakeWord } from '_tests_/utils'

export const equipmentCategoryListItem = (
  props?: Partial<Pick<EquipmentCategoryDTO, 'code'>>,
): EquipmentCategoryDTO => ({
  code: props?.code || EquipmentCategoryEnum.Equipment,

  id: fakeId(),
  title: fakeWord(),
})

export const equipmentCategoryList = (length: number = 1): EquipmentCategoriesDTO =>
  times(length, () => equipmentCategoryListItem())
