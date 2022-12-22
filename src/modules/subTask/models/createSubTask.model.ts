import { SubTaskModel } from 'modules/subTask/models'
import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type CreateSubTaskMutationArgsModel = BaseTaskRequestArgs & {
  title: string
  description: string
  templateX5: number
}

export type CreateSubTaskResponseModel = SubTaskModel
