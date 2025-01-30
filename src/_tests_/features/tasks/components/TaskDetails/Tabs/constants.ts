import { TabsProps } from 'features/task/components/TaskDetails/Tabs/index'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'features/task/constants/task/index'

import taskFixtures from '_tests_/fixtures/task/index'
import userFixtures from '_tests_/fixtures/user/index'
import { fakeDateString, fakeId, fakeIdStr, fakeWord } from '_tests_/utils'

export const props: Readonly<TabsProps> = {
  task: {
    id: fakeId(),
    type: TaskTypeEnum.Request,
    title: fakeWord(),
    description: fakeWord(),
    userResolution: fakeWord(),
    techResolution: fakeWord(),
    attachments: [taskFixtures.attachment()],
    resolution: {
      attachments: [],
    },
    status: TaskStatusEnum.New,
    extendedStatus: TaskExtendedStatusEnum.New,
    recordId: fakeIdStr(),
    suspendRequest: taskFixtures.suspendRequest(),
    assignee: null,
    olaNextBreachTime: fakeDateString(),
    olaEstimatedTime: Date.now(),
    olaStatus: TaskOlaStatusEnum.NotExpired,
    shop: taskFixtures.task().shop,
    isDescriptionChanged: false,
    previousDescription: fakeWord(),
  },
  userActions: userFixtures.userActions(),
}

export enum TestIdsEnum {
  TaskDetailsTabs = 'task-details-tabs',
}
