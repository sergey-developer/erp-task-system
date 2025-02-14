import { RelocationTaskModel } from 'features/warehouse/models'
import { RelocationTaskRequestArgs } from 'features/warehouse/types'

export type ReturnRelocationTaskToReworkRequest = RelocationTaskRequestArgs & {
  reason: string
}

export type ReturnRelocationTaskToReworkResponse = Pick<RelocationTaskModel, 'status'>

export type ReturnRelocationTaskToReworkBadRequestErrorResponse = Pick<
  ReturnRelocationTaskToReworkRequest,
  'reason'
>
