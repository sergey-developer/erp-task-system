import { TaskActionsPermissionsEnum } from 'features/task/constants/task'

import { IdType } from 'shared/types/common'

export type UserTasksActionsDTO = Partial<Record<TaskActionsPermissionsEnum, IdType[]>>
