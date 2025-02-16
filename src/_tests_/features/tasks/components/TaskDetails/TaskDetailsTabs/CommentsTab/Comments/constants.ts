import { CommentsProps } from 'features/tasks/components/TaskDetails/TaskDetailsTabs/CommentsTab/Comments/index'

import taskFixtures from '_tests_/fixtures/tasks/index'

export const props: Readonly<CommentsProps> = {
  comments: taskFixtures.commentList(),
  isLoading: false,
}

export enum TestIdsEnum {
  TaskComments = 'task-comments',
  TaskComment = 'task-comment',
}
