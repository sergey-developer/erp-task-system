import { SubTaskDTO } from 'features/tasks/api/dto'
import { RequestWithTask } from 'features/tasks/api/types'

export type CreateSubTaskRequest = RequestWithTask & {
  title: string
  description: string
  templateX5: number
}

export type CreateSubTaskResponse = SubTaskDTO
