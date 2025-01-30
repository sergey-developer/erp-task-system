import { RelocationTasksTabProps } from 'features/task/components/TaskDetails/Tabs/RelocationTasksTab/types'

import taskFixtures from '_tests_/fixtures/task/index'

export const props: RelocationTasksTabProps = {
  task: taskFixtures.task(),
}

export enum TestIdsEnum {
  RelocationTasksTab = 'relocation-tasks-tab',
}
