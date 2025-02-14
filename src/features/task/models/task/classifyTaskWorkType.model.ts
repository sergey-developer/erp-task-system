import { RequestWithTask } from 'features/task/types'

import { IdType } from 'shared/types/common'

export type ClassifyTaskWorkTypeRequest = RequestWithTask & {
  workType: IdType
}

export type ClassifyTaskWorkTypeResponse = void
