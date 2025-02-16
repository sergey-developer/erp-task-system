import { TaskTypeEnum } from 'features/tasks/api/constants'
import { ResolutionTabProps } from 'features/tasks/components/TaskDetails/TaskDetailsTabs/ResolutionTab'

import taskFixtures from '_tests_/fixtures/tasks/index'
import { fakeWord } from '_tests_/helpers'

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
