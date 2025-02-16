import { RelocationTasksTabProps } from 'features/tasks/components/TaskDetails/TaskDetailsTabs/RelocationTasksTab/types'

import taskFixtures from '_tests_/fixtures/tasks/index'

export const props: RelocationTasksTabProps = {
  task: taskFixtures.task(),
}

export enum TestIdsEnum {
  RelocationTasksTab = 'relocation-tasks-tab',
}
