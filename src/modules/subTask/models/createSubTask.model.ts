import { SubTaskModel } from 'modules/subTask/models'
import { BaseTaskRequestArgs } from 'modules/task/interfaces'

export type CreateSubTaskMutationArgs = BaseTaskRequestArgs & {
  title: string
  description: string
  templateX5: number
}

export type CreateSubTaskSuccessResponse = SubTaskModel
