import { ResolutionTabProps } from 'features/tasks/components/TaskDetails/Tabs/ResolutionTab/index'
import { TaskTypeEnum } from 'features/tasks/constants/task/index'

import taskFixtures from '_tests_/fixtures/task/index'
import { fakeWord } from '_tests_/utils'

export const props: Readonly<
  Pick<ResolutionTabProps, 'title' | 'type' | 'techResolution' | 'userResolution' | 'attachments'>
> = {
  type: TaskTypeEnum.Request,
  title: fakeWord(),
  techResolution: null,
  userResolution: null,
  attachments: [taskFixtures.attachment()],
}

export enum TestIdsEnum {
  TaskResolutionTab = 'task-resolution-tab',
}
