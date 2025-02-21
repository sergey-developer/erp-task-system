import { EquipmentCategoryEnum } from 'features/equipments/api/constants'
import { EquipmentCategoriesDTO, EquipmentCategoryDTO } from 'features/equipments/api/dto'
import times from 'lodash/times'

import { fakeId, fakeWord } from '_tests_/helpers'

export const equipmentCategory = (
  props?: Partial<Pick<EquipmentCategoryDTO, 'code'>>,
): EquipmentCategoryDTO => ({
  code: props?.code || EquipmentCategoryEnum.Equipment,

  id: fakeId(),
  title: fakeWord(),
})

export const equipmentCategories = (length: number = 1): EquipmentCategoriesDTO =>
  times(length, () => equipmentCategory())
