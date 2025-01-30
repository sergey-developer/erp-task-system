import { SubTaskListTabProps } from 'features/task/components/TaskDetails/Tabs/SubTaskListTab/index'
import {
  TaskActionsPermissionsEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'features/task/constants/task/index'

import taskFixtures from '_tests_/fixtures/task/index'
import userFixtures from '_tests_/fixtures/user/index'

export const props: Readonly<SubTaskListTabProps> = {
  task: taskFixtures.task(),
  userActions: userFixtures.userActions(),
  permissions: {},
}

export const activeCreateSubTaskButtonTaskProps: {
  task: Pick<SubTaskListTabProps['task'], 'status' | 'extendedStatus' | 'type' | 'suspendRequest'>
  userActions: SubTaskListTabProps['userActions']
} = {
  task: {
    status: TaskStatusEnum.InProgress,
    extendedStatus: TaskExtendedStatusEnum.New,
    type: TaskTypeEnum.Request,
    suspendRequest: null,
  },
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanSubtasksCreate]: [props.task.id],
    },
  }),
}

export enum TestIdsEnum {
  SubtaskListTab = 'subtask-list-tab',
}
