import { RequestWithTask } from 'features/task/types'

import { IdType } from 'shared/types/common'

export type DeleteCompletedWorkRequest = RequestWithTask & { id: IdType }
export type DeleteCompletedWorkResponse = void
