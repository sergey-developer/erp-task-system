import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'features/tasks/api/constants'
import { TaskDetailTabsProps } from 'features/tasks/components/TaskDetails/TaskDetailsTabs'

import tasksFixtures from '_tests_/fixtures/api/data/tasks/index'
import userFixtures from '_tests_/fixtures/api/data/users/index'
import { fakeDateString, fakeId, fakeIdStr, fakeWord } from '_tests_/helpers'

export const props: Readonly<TaskDetailTabsProps> = {
  task: {
    id: fakeId(),
    type: TaskTypeEnum.Request,
    title: fakeWord(),
    description: fakeWord(),
    userResolution: fakeWord(),
    techResolution: fakeWord(),
    attachments: [tasksFixtures.taskAttachment()],
    resolution: {
      attachments: [],
    },
    status: TaskStatusEnum.New,
    extendedStatus: TaskExtendedStatusEnum.New,
    recordId: fakeIdStr(),
    suspendRequest: tasksFixtures.taskSuspendRequest(),
    assignee: null,
    olaNextBreachTime: fakeDateString(),
    olaEstimatedTime: Date.now(),
    olaStatus: TaskOlaStatusEnum.NotExpired,
    shop: tasksFixtures.taskDetail().shop,
    isDescriptionChanged: false,
    previousDescription: fakeWord(),
  },
  userActions: userFixtures.userActions(),
}

export enum TestIdsEnum {
  TaskDetailsTabs = 'task-details-tabs',
}
