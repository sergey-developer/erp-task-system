import isBoolean from 'lodash/isBoolean'

import { CheckInventorizationEquipmentsTableRow } from 'modules/warehouse/components/CheckInventorizationEquipmentsTable/types'
import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const checkInventorizationEquipmentsTableRow = (
  props?: Partial<Pick<CheckInventorizationEquipmentsTableRow, 'isCredited'>>,
): CheckInventorizationEquipmentsTableRow => ({
  isCredited: isBoolean(props?.isCredited) ? props!.isCredited : false,

  rowId: fakeId(),
  title: fakeWord(),
  inventoryNumber: fakeWord(),
  serialNumber: fakeWord(),
  nomenclature: { id: fakeId(), title: fakeWord(), vendorCode: fakeWord() },
  category: { id: fakeId(), title: fakeWord(), code: EquipmentCategoryEnum.Equipment },
  locationFact: { id: fakeId(), title: fakeWord() },
  quantityFact: fakeInteger(),
})
