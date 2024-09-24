import { CommentsTabProps } from 'modules/task/components/TaskDetails/Tabs/CommentsTab/index'

import { fakeId, fakeWord } from '_tests_/utils/index'

export const props: Readonly<CommentsTabProps> = {
  title: fakeWord(),
  taskId: fakeId(),
}

export enum TestIdsEnum {
  TaskCommentsTab = 'task-comments-tab',
}
