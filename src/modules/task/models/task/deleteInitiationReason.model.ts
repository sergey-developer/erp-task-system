import { TaskRequestArgs } from 'modules/task/types'

import { IdType } from 'shared/types/common'

export type DeleteInitiationReasonMutationArgs = TaskRequestArgs & { id: IdType }
export type DeleteInitiationReasonSuccessResponse = void
