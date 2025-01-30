import { RelocationTaskModel } from 'features/warehouse/models'
import { RelocationTaskRequestArgs } from 'features/warehouse/types'

export type ReturnRelocationTaskToReworkMutationArgs = RelocationTaskRequestArgs & {
  reason: string
}

export type ReturnRelocationTaskToReworkSuccessResponse = Pick<RelocationTaskModel, 'status'>

export type ReturnRelocationTaskToReworkBadRequestErrorResponse = Pick<
  ReturnRelocationTaskToReworkMutationArgs,
  'reason'
>
