import { RelocationTaskRequestArgs } from 'modules/warehouse/types'

import { RelocationTaskModel } from './relocationTask.model'

export type MoveRelocationTaskDraftToWorkMutationArgs = RelocationTaskRequestArgs

export type MoveRelocationTaskDraftToWorkSuccessResponse = Pick<RelocationTaskModel, 'status'>
