import { RequestWithRelocationTask } from 'features/warehouses/types'

import { RelocationTaskDetailDTO } from '../dto'

export type MoveRelocationTaskDraftToWorkRequest = RequestWithRelocationTask

export type MoveRelocationTaskDraftToWorkResponse = Pick<RelocationTaskDetailDTO, 'status'>
