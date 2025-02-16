import { TasksFromMapProps } from 'features/tasks/components/TasksFromMap/types'

import taskFixtures from '_tests_/fixtures/tasks/index'

export const taskListItem = taskFixtures.taskListItem()

export const props: Readonly<TasksFromMapProps> = {
  tasks: [taskListItem],
  selectedTaskId: null,
  onClickTask: jest.fn(),
}

export enum TestIdsEnum {
  TasksFromMap = 'tasks-from-map',
}
