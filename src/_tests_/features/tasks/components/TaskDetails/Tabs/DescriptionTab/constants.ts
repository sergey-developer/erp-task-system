import { DescriptionTabProps } from 'features/task/components/TaskDetails/Tabs/DescriptionTab/index'

import taskFixtures from '_tests_/fixtures/task/index'
import { fakeWord } from '_tests_/utils'

export const props: Readonly<DescriptionTabProps> = {
  permissions: {},
  title: fakeWord(),
  taskTitle: fakeWord(),
  description: fakeWord(),
  previousDescription: fakeWord(),
  isDescriptionChanged: false,
  attachments: [taskFixtures.attachment()],
}

export enum TestIdsEnum {
  TaskDescriptionTab = 'task-description-tab',
}
