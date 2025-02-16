import { RequestWithRelocationTask } from 'features/relocationTasks/api/types'

import { RelocationTaskDetailDTO } from '../dto'

export type CloseRelocationTaskRequest = RequestWithRelocationTask
export type CloseRelocationTaskResponse = Pick<RelocationTaskDetailDTO, 'status'>
