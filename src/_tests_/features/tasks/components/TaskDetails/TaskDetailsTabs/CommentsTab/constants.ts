import { CommentsTabProps } from 'features/tasks/components/TaskDetails/TaskDetailsTabs/CommentsTab/index'

import { fakeId, fakeWord } from '_tests_/helpers'

export const props: Readonly<CommentsTabProps> = {
  title: fakeWord(),
  taskId: fakeId(),
}

export enum TestIdsEnum {
  TaskCommentsTab = 'task-comments-tab',
}
