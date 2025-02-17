import { EquipmentNomenclatureTableProps } from 'features/nomenclatures/components/EquipmentNomenclatureTable/types'

import equipmentsFixtures from '_tests_/fixtures/api/data/equipments'

export const equipmentNomenclatureListItem = equipmentsFixtures.equipmentNomenclatureListItem()

export const props: Readonly<EquipmentNomenclatureTableProps> = {
  dataSource: [equipmentNomenclatureListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
}

export enum TestIdsEnum {
  EquipmentNomenclatureTable = 'equipment-nomenclature-table',
}
