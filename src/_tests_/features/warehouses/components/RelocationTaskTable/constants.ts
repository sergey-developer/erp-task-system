import { RelocationTaskTableProps } from 'features/relocationTasks/components/RelocationTaskTable/types'

import warehousesFixtures from '_tests_/fixtures/warehouse/index'

export const relocationTaskListItem = warehousesFixtures.relocationTaskListItem()

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
