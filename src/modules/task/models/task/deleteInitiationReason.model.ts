import { BaseTaskRequestArgs } from 'modules/task/types'

import { IdType } from 'shared/types/common'

export type DeleteInitiationReasonMutationArgs = BaseTaskRequestArgs & { id: IdType }
export type DeleteInitiationReasonSuccessResponse = void
