import { TaskRequestArgs } from 'features/task/types'

import { IdType } from 'shared/types/common'

export type DeleteCompletedWorkMutationArgs = TaskRequestArgs & { id: IdType }
export type DeleteCompletedWorkSuccessResponse = void
