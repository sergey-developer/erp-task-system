import { RelocationTaskModel } from 'features/warehouse/models'
import { RelocationTaskRequestArgs } from 'features/warehouse/types'

export type CancelRelocationTaskRequest = RelocationTaskRequestArgs
export type CancelRelocationTaskResponse = Pick<RelocationTaskModel, 'status'>
