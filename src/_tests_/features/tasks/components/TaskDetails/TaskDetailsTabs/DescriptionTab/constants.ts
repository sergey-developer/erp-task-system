import { DescriptionTabProps } from 'features/tasks/components/TaskDetails/TaskDetailsTabs/DescriptionTab/index'

import tasksFixtures from '_tests_/fixtures/tasks/index'
import { fakeWord } from '_tests_/helpers'

export const props: Readonly<DescriptionTabProps> = {
  permissions: {},
  title: fakeWord(),
  taskTitle: fakeWord(),
  description: fakeWord(),
  previousDescription: fakeWord(),
  isDescriptionChanged: false,
  attachments: [tasksFixtures.taskAttachment()],
}

export enum TestIdsEnum {
  TaskDescriptionTab = 'task-description-tab',
}
