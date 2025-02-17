import { RelocationTasksProps } from 'features/tasks/components/RelocationTasks/types'

import relocationTasksFixtures from '_tests_/fixtures/relocationTasks'

export const relocationTaskListItem = relocationTasksFixtures.relocationTask()

export const props: RelocationTasksProps = {
  data: [relocationTaskListItem],
  onClick: jest.fn(),
  onCreateAttachment: jest.fn(),
}

export enum TestIdsEnum {
  RelocationTasks = 'relocation-tasks',
}
