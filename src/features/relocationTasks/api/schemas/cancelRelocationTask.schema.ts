import { RequestWithRelocationTask } from 'features/warehouses/types'

import { RelocationTaskDetailDTO } from '../dto'

export type CancelRelocationTaskRequest = RequestWithRelocationTask
export type CancelRelocationTaskResponse = Pick<RelocationTaskDetailDTO, 'status'>
