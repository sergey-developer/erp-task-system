import { SubTaskModel } from 'features/task/models'
import { RequestWithTask } from 'features/task/types'

export type CreateSubTaskRequest = RequestWithTask & {
  title: string
  description: string
  templateX5: number
}

export type CreateSubTaskResponse = SubTaskModel
