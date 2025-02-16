import { RequestWithRelocationTask } from 'features/relocationTasks/api/types'

import { RelocationTaskDetailDTO } from '../dto'

export type CancelRelocationTaskRequest = RequestWithRelocationTask
export type CancelRelocationTaskResponse = Pick<RelocationTaskDetailDTO, 'status'>
