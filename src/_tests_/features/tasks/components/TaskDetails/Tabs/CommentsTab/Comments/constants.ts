import { CommentsProps } from 'features/tasks/components/TaskDetails/Tabs/CommentsTab/Comments/index'

import taskFixtures from '_tests_/fixtures/task/index'

export const props: Readonly<CommentsProps> = {
  comments: taskFixtures.commentList(),
  isLoading: false,
}

export enum TestIdsEnum {
  TaskComments = 'task-comments',
  TaskComment = 'task-comment',
}
