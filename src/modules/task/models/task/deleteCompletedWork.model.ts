import { TaskRequestArgs } from 'modules/task/types'

import { IdType } from 'shared/types/common'

export type DeleteCompletedWorkMutationArgs = TaskRequestArgs & { id: IdType }
export type DeleteCompletedWorkSuccessResponse = void
