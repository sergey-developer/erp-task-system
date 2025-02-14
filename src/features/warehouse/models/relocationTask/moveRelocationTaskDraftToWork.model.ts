import { RequestWithRelocationTask } from 'features/warehouse/types'

import { RelocationTaskModel } from './relocationTask.model'

export type MoveRelocationTaskDraftToWorkRequest = RequestWithRelocationTask

export type MoveRelocationTaskDraftToWorkResponse = Pick<RelocationTaskModel, 'status'>
