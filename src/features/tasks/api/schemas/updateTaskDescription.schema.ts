import { RequestWithTask } from 'features/tasks/api/types'

export type UpdateTaskDescriptionRequest = RequestWithTask & {
  internalDescription: string
}

export type UpdateTaskDescriptionResponse = Pick<
  UpdateTaskDescriptionRequest,
  'internalDescription'
>
