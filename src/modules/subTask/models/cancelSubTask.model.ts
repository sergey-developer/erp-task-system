import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type CancelSubTaskMutationArgsModel = BaseTaskRequestArgs & {
  cancelReason: string
}

export type CancelSubTaskResponseModel = void
