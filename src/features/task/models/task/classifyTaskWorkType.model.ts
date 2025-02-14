import { TaskRequestArgs } from 'features/task/types'

import { IdType } from 'shared/types/common'

export type ClassifyTaskWorkTypeRequest = TaskRequestArgs & {
  workType: IdType
}

export type ClassifyTaskWorkTypeResponse = void
