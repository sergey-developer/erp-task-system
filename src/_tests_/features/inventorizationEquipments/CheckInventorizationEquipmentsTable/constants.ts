import {
  CheckInventorizationEquipmentsTableProps,
  CheckInventorizationEquipmentsTableRow,
} from 'modules/warehouse/components/CheckInventorizationEquipmentsTable/types'
import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const tableRow: CheckInventorizationEquipmentsTableRow = {
  row: fakeId(),
  title: fakeWord(),
  inventoryNumber: fakeWord(),
  serialNumber: fakeWord(),
  nomenclature: { id: fakeId(), title: fakeWord(), vendorCode: fakeWord() },
  category: { id: fakeId(), title: fakeWord(), code: EquipmentCategoryEnum.Equipment },
  isCredited: false,
  locationFact: { id: fakeId(), title: fakeWord() },
  quantityFact: fakeInteger(),
}

export const props: Readonly<CheckInventorizationEquipmentsTableProps> = {
  dataSource: [tableRow],
}

export enum TestIdsEnum {
  Table = 'check-inventorization-equipments-table',
}
