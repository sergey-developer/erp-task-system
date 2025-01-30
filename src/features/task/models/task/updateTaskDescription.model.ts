import { TaskRequestArgs } from 'features/task/types'

export type UpdateTaskDescriptionMutationArgs = TaskRequestArgs & {
  internalDescription: string
}

export type UpdateTaskDescriptionSuccessResponse = Pick<
  UpdateTaskDescriptionMutationArgs,
  'internalDescription'
>
