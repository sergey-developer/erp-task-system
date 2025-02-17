import { CommentsProps } from 'features/tasks/components/TaskDetails/TaskDetailsTabs/CommentsTab/Comments/index'

import tasksFixtures from '_tests_/fixtures/api/data/tasks/index'

export const props: Readonly<CommentsProps> = {
  comments: tasksFixtures.taskComments(),
  isLoading: false,
}

export enum TestIdsEnum {
  TaskComments = 'task-comments',
  TaskComment = 'task-comment',
}
