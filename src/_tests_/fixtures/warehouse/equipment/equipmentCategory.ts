import { EquipmentCategoryEnum } from 'features/warehouse/constants/equipment'
import { EquipmentCategoryModel } from 'features/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const equipmentCategory = (
  props?: Partial<Pick<EquipmentCategoryModel, 'code'>>,
): EquipmentCategoryModel => ({
  code: props?.code || EquipmentCategoryEnum.Equipment,

  id: fakeId(),
  title: fakeWord(),
})
