import { TaskRequestArgs } from 'features/task/types'

import { IdType } from 'shared/types/common'

export type DeleteInitiationReasonRequest = TaskRequestArgs & { id: IdType }
export type DeleteInitiationReasonResponse = void
