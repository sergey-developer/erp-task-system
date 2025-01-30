import { RelocationTaskTableProps } from 'features/warehouse/components/RelocationTaskTable/types'

import warehouseFixtures from '_tests_/fixtures/warehouse/index'

export const relocationTaskListItem = warehouseFixtures.relocationTaskListItem()

export const props: Readonly<RelocationTaskTableProps> = {
  dataSource: [relocationTaskListItem],
  pagination: {},
  loading: false,
  onChange: jest.fn(),
  onRow: jest.fn(),
}

export enum TestIdsEnum {
  RelocationTaskTable = 'relocation-task-table',
}
