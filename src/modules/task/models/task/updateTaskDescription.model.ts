import { TaskRequestArgs } from 'modules/task/types'

export type UpdateTaskDescriptionMutationArgs = TaskRequestArgs & {
  internalDescription: string
}

export type UpdateTaskDescriptionSuccessResponse = Pick<
  UpdateTaskDescriptionMutationArgs,
  'internalDescription'
>
