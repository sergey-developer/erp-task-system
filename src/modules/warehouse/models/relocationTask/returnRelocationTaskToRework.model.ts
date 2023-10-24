import { RelocationTaskModel } from 'modules/warehouse/models'
import { BaseRelocationTaskRequestArgs } from 'modules/warehouse/types'

export type ReturnRelocationTaskToReworkMutationArgs = BaseRelocationTaskRequestArgs & {
  reason: string
}

export type ReturnRelocationTaskToReworkSuccessResponse = Pick<RelocationTaskModel, 'status'>

export type ReturnRelocationTaskToReworkBadRequestErrorResponse = Pick<
  ReturnRelocationTaskToReworkMutationArgs,
  'reason'
>
