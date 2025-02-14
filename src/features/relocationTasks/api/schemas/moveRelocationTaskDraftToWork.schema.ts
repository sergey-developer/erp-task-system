import { RequestWithRelocationTask } from 'features/warehouse/types'

import { RelocationTaskDetailDTO } from '../dto'

export type MoveRelocationTaskDraftToWorkRequest = RequestWithRelocationTask

export type MoveRelocationTaskDraftToWorkResponse = Pick<RelocationTaskDetailDTO, 'status'>
