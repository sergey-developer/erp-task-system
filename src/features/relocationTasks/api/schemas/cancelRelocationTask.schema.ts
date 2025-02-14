import { RequestWithRelocationTask } from 'features/warehouse/types'

import { RelocationTaskDetailDTO } from '../dto'

export type CancelRelocationTaskRequest = RequestWithRelocationTask
export type CancelRelocationTaskResponse = Pick<RelocationTaskDetailDTO, 'status'>
