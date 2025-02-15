import { RequestWithTask } from 'features/tasks/api/types'

import { IdType } from 'shared/types/common'

export type ClassifyTaskWorkTypeRequest = RequestWithTask & {
  workType: IdType
}

export type ClassifyTaskWorkTypeResponse = void
