import { TaskActionsPermissionsEnum } from 'features/task/constants/task'

import { IdType } from 'shared/types/common'

export type TasksActions = Partial<Record<TaskActionsPermissionsEnum, IdType[]>>

export type UserActionsModel = {
  tasks: TasksActions
}
