import { CommentProps } from 'features/task/components/TaskDetails/Tabs/CommentsTab/Comments/Comment/index'

import taskFixtures from '_tests_/fixtures/task/index'
import { fakeWord } from '_tests_/utils'

export const props: Readonly<CommentProps> = {
  text: fakeWord(),
  author: fakeWord(),
  createdAt: fakeWord(),
  attachments: [taskFixtures.attachment()],
}

export enum TestIdsEnum {
  TaskComment = 'task-comment',
}
