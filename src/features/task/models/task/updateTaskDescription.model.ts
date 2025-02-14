import { RequestWithTask } from 'features/task/types'

export type UpdateTaskDescriptionRequest = RequestWithTask & {
  internalDescription: string
}

export type UpdateTaskDescriptionResponse = Pick<
  UpdateTaskDescriptionRequest,
  'internalDescription'
>
