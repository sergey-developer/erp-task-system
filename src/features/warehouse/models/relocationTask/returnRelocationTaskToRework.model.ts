import { RelocationTaskModel } from 'features/warehouse/models'
import { RequestWithRelocationTask } from 'features/warehouse/types'

export type ReturnRelocationTaskToReworkRequest = RequestWithRelocationTask & {
  reason: string
}

export type ReturnRelocationTaskToReworkResponse = Pick<RelocationTaskModel, 'status'>

export type ReturnRelocationTaskToReworkBadRequestResponse = Pick<
  ReturnRelocationTaskToReworkRequest,
  'reason'
>
