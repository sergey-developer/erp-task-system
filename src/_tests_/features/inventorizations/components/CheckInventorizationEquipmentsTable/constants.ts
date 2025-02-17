import { CheckInventorizationEquipmentsTableProps } from 'features/inventorizations/components/CheckInventorizationEquipmentsTable/types'

import inventorizationsFixtures from '_tests_/fixtures/api/data/inventorizations'

export const tableRow = inventorizationsFixtures.checkInventorizationEquipmentsTableRow()

export const props: Readonly<CheckInventorizationEquipmentsTableProps> = {
  dataSource: [tableRow],
  onClickEdit: jest.fn(),
  loading: false,
  editTouchedRowsIds: [],
}

export enum TestIdsEnum {
  Table = 'check-inventorization-equipments-table',
}
