import { SubTaskModel } from 'features/task/models'
import { TaskRequestArgs } from 'features/task/types'

export type CreateSubTaskMutationArgs = TaskRequestArgs & {
  title: string
  description: string
  templateX5: number
}

export type CreateSubTaskSuccessResponse = SubTaskModel
