import { BaseTaskRequestArgs } from 'modules/task/types'

export type UpdateTaskDescriptionMutationArgs = BaseTaskRequestArgs & {
  internalDescription: string
}

export type UpdateTaskDescriptionSuccessResponse = Pick<
  UpdateTaskDescriptionMutationArgs,
  'internalDescription'
>
