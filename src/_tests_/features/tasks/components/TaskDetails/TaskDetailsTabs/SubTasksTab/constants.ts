import {
  TaskActionsPermissionsEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'features/tasks/api/constants'
import { SubTasksTabProps } from 'features/tasks/components/TaskDetails/TaskDetailsTabs/SubTasksTab'

import tasksFixtures from '_tests_/fixtures/api/data/tasks/index'
import userFixtures from '_tests_/fixtures/api/data/users/index'

export const props: Readonly<SubTasksTabProps> = {
  task: tasksFixtures.taskDetail(),
  userActions: userFixtures.userActions(),
  permissions: {},
}

export const activeCreateSubTaskButtonTaskProps: {
  task: Pick<SubTasksTabProps['task'], 'status' | 'extendedStatus' | 'type' | 'suspendRequest'>
  userActions: SubTasksTabProps['userActions']
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
