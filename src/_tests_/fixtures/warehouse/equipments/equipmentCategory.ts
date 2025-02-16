import { EquipmentCategoryEnum } from 'features/equipments/api/constants'
import { EquipmentCategoryDTO } from 'features/equipments/api/dto'

import { fakeId, fakeWord } from '_tests_/utils'

export const equipmentCategory = (
  props?: Partial<Pick<EquipmentCategoryDTO, 'code'>>,
): EquipmentCategoryDTO => ({
  code: props?.code || EquipmentCategoryEnum.Equipment,

  id: fakeId(),
  title: fakeWord(),
})
