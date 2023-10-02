import { SubTaskModel } from 'modules/task/models'
import { BaseTaskRequestArgs } from 'modules/task/types'

export type CreateSubTaskMutationArgs = BaseTaskRequestArgs & {
  title: string
  description: string
  templateX5: number
}

export type CreateSubTaskSuccessResponse = SubTaskModel
