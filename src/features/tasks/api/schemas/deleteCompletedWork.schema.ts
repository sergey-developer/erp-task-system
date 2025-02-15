import { RequestWithTask } from 'features/tasks/api/types'

import { IdType } from 'shared/types/common'

export type DeleteTaskCompletedWorkRequest = RequestWithTask & { id: IdType }
export type DeleteTaskCompletedWorkResponse = void
