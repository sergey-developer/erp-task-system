import { ResolutionTabProps } from 'features/task/components/TaskDetails/Tabs/ResolutionTab/index'
import { TaskTypeEnum } from 'features/task/constants/task/index'

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
