import { EquipmentCategoryEnum } from 'modules/warehouse/constants'
import { EquipmentCategoryModel } from 'modules/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const equipmentCategory = (
  props?: Partial<Pick<EquipmentCategoryModel, 'code'>>,
): EquipmentCategoryModel => ({
  code: props?.code || EquipmentCategoryEnum.Equipment,

  id: fakeId(),
  title: fakeWord(),
})
