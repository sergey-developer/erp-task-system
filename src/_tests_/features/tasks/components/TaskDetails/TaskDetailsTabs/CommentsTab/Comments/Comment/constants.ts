import { CommentProps } from 'features/tasks/components/TaskDetails/TaskDetailsTabs/CommentsTab/Comments/Comment/index'

import tasksFixtures from '_tests_/fixtures/tasks/index'
import { fakeWord } from '_tests_/helpers'

export const props: Readonly<CommentProps> = {
  text: fakeWord(),
  author: fakeWord(),
  createdAt: fakeWord(),
  attachments: [tasksFixtures.taskAttachment()],
}

export enum TestIdsEnum {
  TaskComment = 'task-comment',
}
