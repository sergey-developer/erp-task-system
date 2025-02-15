import { TaskActionsPermissionsEnum } from 'features/tasks/api/constants'

import { IdType } from 'shared/types/common'

export type UserTasksActionsDTO = Partial<Record<TaskActionsPermissionsEnum, IdType[]>>
