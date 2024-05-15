import { RelocationTaskModel } from 'modules/warehouse/models'
import { RelocationTaskRequestArgs } from 'modules/warehouse/types'

export type ReturnRelocationTaskToReworkMutationArgs = RelocationTaskRequestArgs & {
  reason: string
}

export type ReturnRelocationTaskToReworkSuccessResponse = Pick<RelocationTaskModel, 'status'>

export type ReturnRelocationTaskToReworkBadRequestErrorResponse = Pick<
  ReturnRelocationTaskToReworkMutationArgs,
  'reason'
>
