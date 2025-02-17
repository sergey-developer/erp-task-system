import { RelocationTaskTableProps } from 'features/relocationTasks/components/RelocationTaskTable/types'

import relocationTasksFixtures from '_tests_/fixtures/api/data/relocationTasks'

export const relocationTaskListItem = relocationTasksFixtures.relocationTask()

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
