import { CheckInventorizationEquipmentsTableProps } from 'features/inventorizations/components/CheckInventorizationEquipmentsTable/types'

import warehouseFixtures from '_tests_/fixtures/warehouse'

export const tableRow = warehouseFixtures.checkInventorizationEquipmentsTableRow()

export const props: Readonly<CheckInventorizationEquipmentsTableProps> = {
  dataSource: [tableRow],
  onClickEdit: jest.fn(),
  loading: false,
  editTouchedRowsIds: [],
}

export enum TestIdsEnum {
  Table = 'check-inventorization-equipments-table',
}
