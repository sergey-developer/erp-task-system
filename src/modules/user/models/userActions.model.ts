import { TaskActionsPermissionsEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'

export type TasksActions = Record<TaskActionsPermissionsEnum, IdType[]>

export type UserActionsModel = {
  tasks: TasksActions
}
