import { SubTaskModel } from 'modules/task/models'
import { TaskRequestArgs } from 'modules/task/types'

export type CreateSubTaskMutationArgs = TaskRequestArgs & {
  title: string
  description: string
  templateX5: number
}

export type CreateSubTaskSuccessResponse = SubTaskModel
