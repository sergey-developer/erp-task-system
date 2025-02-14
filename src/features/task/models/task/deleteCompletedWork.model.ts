import { TaskRequestArgs } from 'features/task/types'

import { IdType } from 'shared/types/common'

export type DeleteCompletedWorkRequest = TaskRequestArgs & { id: IdType }
export type DeleteCompletedWorkResponse = void
