import { RelocationTaskRequestArgs } from 'features/warehouse/types'

import { RelocationTaskModel } from './relocationTask.model'

export type MoveRelocationTaskDraftToWorkRequest = RelocationTaskRequestArgs

export type MoveRelocationTaskDraftToWorkResponse = Pick<RelocationTaskModel, 'status'>
