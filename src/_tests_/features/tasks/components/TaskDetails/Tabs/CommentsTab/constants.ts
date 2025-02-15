import { CommentsTabProps } from 'features/tasks/components/TaskDetails/Tabs/CommentsTab/index'

import { fakeId, fakeWord } from '_tests_/utils'

export const props: Readonly<CommentsTabProps> = {
  title: fakeWord(),
  taskId: fakeId(),
}

export enum TestIdsEnum {
  TaskCommentsTab = 'task-comments-tab',
}
