import { TaskRequestArgs } from 'features/task/types'

import { IdType } from 'shared/types/common'

export type ClassifyTaskWorkTypeMutationArgs = TaskRequestArgs & {
  workType: IdType
}

export type ClassifyTaskWorkTypeSuccessResponse = void
