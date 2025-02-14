import { RelocationTaskModel } from 'features/warehouse/models'
import { RelocationTaskRequestArgs } from 'features/warehouse/types'

export type CloseRelocationTaskRequest = RelocationTaskRequestArgs
export type CloseRelocationTaskResponse = Pick<RelocationTaskModel, 'status'>
