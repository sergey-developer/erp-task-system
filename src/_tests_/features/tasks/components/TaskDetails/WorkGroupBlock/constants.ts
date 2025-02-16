import {
  TaskActionsPermissionsEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'features/tasks/api/constants'
import { WorkGroupBlockProps } from 'features/tasks/components/TaskDetails/WorkGroupBlock/index'

import taskFixtures from '_tests_/fixtures/tasks/index'
import userFixtures from '_tests_/fixtures/users/index'
import { fakeId, fakeIdStr } from '_tests_/helpers'

export const props: Readonly<WorkGroupBlockProps> = {
  id: fakeId(),
  type: TaskTypeEnum.Request,
  recordId: fakeIdStr(),
  status: TaskStatusEnum.New,
  transferTaskToFirstLine: jest.fn(),
  transferTaskToFirstLineIsLoading: false,
  transferTaskToSecondLine: jest.fn(),
  transferTaskToSecondLineIsLoading: false,
  userActions: userFixtures.userActions(),
}

// first line button
export const showFirstLineButtonProps: Pick<WorkGroupBlockProps, 'workGroup' | 'status'> = {
  workGroup: taskFixtures.workGroup(),
  status: TaskStatusEnum.New,
}

export const activeFirstLineButtonProps: Pick<WorkGroupBlockProps, 'userActions'> = {
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanPutOnFirstLine]: [props.id],
    },
  }),
}

// second line button
export const showSecondLineButtonProps: Pick<WorkGroupBlockProps, 'workGroup'> = {
  workGroup: null,
}

export const activeSecondLineButtonProps: Pick<WorkGroupBlockProps, 'userActions'> = {
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanPutOnSecondLine]: [props.id],
    },
  }),
}

export enum TestIdsEnum {
  TaskWorkGroup = 'task-work-group',
}
