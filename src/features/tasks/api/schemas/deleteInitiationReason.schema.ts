import { RequestWithTask } from 'features/tasks/api/types'

import { IdType } from 'shared/types/common'

export type DeleteTaskInitiationReasonRequest = RequestWithTask & { id: IdType }
export type DeleteTaskInitiationReasonResponse = void
