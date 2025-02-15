import { RequestWithRelocationTask } from 'features/warehouses/types'

import { RelocationTaskDetailDTO } from '../dto'

export type ReturnRelocationTaskToReworkRequest = RequestWithRelocationTask & {
  reason: string
}

export type ReturnRelocationTaskToReworkResponse = Pick<RelocationTaskDetailDTO, 'status'>

export type ReturnRelocationTaskToReworkBadRequestResponse = Pick<
  ReturnRelocationTaskToReworkRequest,
  'reason'
>
