import { EquipmentCategoryEnum } from 'features/equipments/api/constants'
import { CheckInventorizationEquipmentsTableRow } from 'features/inventorizations/components/CheckInventorizationEquipmentsTable/types'
import isBoolean from 'lodash/isBoolean'

import { fakeId, fakeInteger, fakeWord } from '_tests_/helpers'

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
