import { SubTaskListTabProps } from 'features/tasks/components/TaskDetails/Tabs/SubTaskListTab/index'
import {
  TaskActionsPermissionsEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'features/tasks/constants/task/index'

import taskFixtures from '_tests_/fixtures/tasks/index'
import userFixtures from '_tests_/fixtures/users/index'

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
