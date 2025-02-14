import { RequestWithTask } from 'features/task/types'

import { IdType } from 'shared/types/common'

export type DeleteInitiationReasonRequest = RequestWithTask & { id: IdType }
export type DeleteInitiationReasonResponse = void
