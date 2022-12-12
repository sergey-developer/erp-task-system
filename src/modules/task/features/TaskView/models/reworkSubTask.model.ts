import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type ReworkSubTaskMutationArgsModel = BaseTaskRequestArgs & {
  returnReason: string
}

export type ReworkSubTaskResponseModel = void
