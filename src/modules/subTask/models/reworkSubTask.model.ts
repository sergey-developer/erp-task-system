import { BaseTaskRequestArgs } from 'modules/task/interfaces'

import { BaseSubTaskRequestArgs } from '../interfaces'

export type ReworkSubTaskMutationArgsModel = BaseTaskRequestArgs &
  BaseSubTaskRequestArgs & {
    returnReason: string
  }

export type ReworkSubTaskResponseModel = void
