import { BaseTaskRequestArgs } from 'modules/task/interfaces'

import { BaseSubTaskRequestArgs } from '../interfaces'

export type CancelSubTaskMutationArgs = BaseTaskRequestArgs &
  BaseSubTaskRequestArgs & {
    cancelReason: string
  }

export type CancelSubTaskSuccessResponse = void
