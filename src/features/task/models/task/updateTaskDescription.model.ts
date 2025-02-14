import { TaskRequestArgs } from 'features/task/types'

export type UpdateTaskDescriptionRequest = TaskRequestArgs & {
  internalDescription: string
}

export type UpdateTaskDescriptionResponse = Pick<
  UpdateTaskDescriptionRequest,
  'internalDescription'
>
