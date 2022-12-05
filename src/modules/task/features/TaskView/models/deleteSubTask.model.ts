import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type DeleteSubTaskMutationArgsModel = BaseTaskRequestArgs & {
  cancelReason: string
}

export type DeleteSubTaskResponseModel = void
