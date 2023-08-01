import { BaseTaskRequestArgs } from 'modules/task/types'

import { BaseSubTaskRequestArgs } from '../types'

export type ReworkSubTaskMutationArgs = BaseTaskRequestArgs &
  BaseSubTaskRequestArgs & {
    returnReason: string
  }

export type ReworkSubTaskSuccessResponse = void
