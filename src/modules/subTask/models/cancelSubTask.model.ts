import { BaseTaskRequestArgs } from 'modules/task/interfaces'

import { BaseSubTaskRequestArgs } from '../interfaces'

export type CancelSubTaskMutationArgsModel = BaseTaskRequestArgs &
  BaseSubTaskRequestArgs & {
    cancelReason: string
  }

export type CancelSubTaskResponseModel = void
