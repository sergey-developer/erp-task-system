import { NomenclatureTableProps } from 'features/nomenclatures/components/NomenclatureTable/types'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const nomenclatureListItem = warehouseFixtures.nomenclatureListItem()

export const props: Readonly<NomenclatureTableProps> = {
  dataSource: [nomenclatureListItem],
  pagination: false,
  loading: false,
  onChange: jest.fn(),
  onClickName: jest.fn(),
}

export enum TestIdsEnum {
  NomenclatureTable = 'nomenclature-table',
}
