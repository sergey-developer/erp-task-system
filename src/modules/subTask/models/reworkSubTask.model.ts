import { BaseTaskRequestArgs } from 'modules/task/interfaces'

import { BaseSubTaskRequestArgs } from '../interfaces'

export type ReworkSubTaskMutationArgs = BaseTaskRequestArgs &
  BaseSubTaskRequestArgs & {
    returnReason: string
  }

export type ReworkSubTaskSuccessResponse = void
