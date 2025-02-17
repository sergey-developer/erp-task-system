import { NomenclatureTableProps } from 'features/nomenclatures/components/NomenclatureTable/types'

import nomenclaturesFixtures from '_tests_/fixtures/nomenclatures'

export const nomenclatureListItem = nomenclaturesFixtures.nomenclature()

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
