import { RelocationTaskModel } from 'features/warehouse/models'
import { RelocationTaskRequestArgs } from 'features/warehouse/types'

export type CancelRelocationTaskMutationArgs = RelocationTaskRequestArgs
export type CancelRelocationTaskSuccessResponse = Pick<RelocationTaskModel, 'status'>
