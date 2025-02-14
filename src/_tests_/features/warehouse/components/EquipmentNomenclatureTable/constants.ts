import { EquipmentNomenclatureTableProps } from 'features/nomenclatures/components/EquipmentNomenclatureTable/types'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const equipmentNomenclatureListItem = warehouseFixtures.equipmentNomenclatureListItem()

export const props: Readonly<EquipmentNomenclatureTableProps> = {
  dataSource: [equipmentNomenclatureListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
}

export enum TestIdsEnum {
  EquipmentNomenclatureTable = 'equipment-nomenclature-table',
}
