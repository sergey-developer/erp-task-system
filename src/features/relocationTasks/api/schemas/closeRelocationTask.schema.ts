import { RequestWithRelocationTask } from 'features/warehouses/types'

import { RelocationTaskDetailDTO } from '../dto'

export type CloseRelocationTaskRequest = RequestWithRelocationTask
export type CloseRelocationTaskResponse = Pick<RelocationTaskDetailDTO, 'status'>
