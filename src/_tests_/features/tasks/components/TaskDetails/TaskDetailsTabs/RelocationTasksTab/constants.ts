import { RelocationTasksTabProps } from 'features/tasks/components/TaskDetails/TaskDetailsTabs/RelocationTasksTab/types'

import tasksFixtures from '_tests_/fixtures/api/data/tasks/index'

export const props: RelocationTasksTabProps = {
  task: tasksFixtures.taskDetail(),
}

export enum TestIdsEnum {
  RelocationTasksTab = 'relocation-tasks-tab',
}
