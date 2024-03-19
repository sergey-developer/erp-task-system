import { BaseTaskRequestArgs } from 'modules/task/types'

import { IdType } from 'shared/types/common'

export type DeleteCompletedWorkMutationArgs = BaseTaskRequestArgs & { id: IdType }
export type DeleteCompletedWorkSuccessResponse = void
