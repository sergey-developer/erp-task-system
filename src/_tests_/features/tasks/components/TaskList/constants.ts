import { TaskListProps } from 'modules/task/components/TaskList/types'

import taskFixtures from '_tests_/fixtures/task/index'

export const taskListItem = taskFixtures.taskListItem()

export const props: Readonly<TaskListProps> = {
  tasks: [taskListItem],
  selectedTaskId: null,
  onClickTask: jest.fn(),
}

export enum TestIdsEnum {
  TaskList = 'task-list',
}
