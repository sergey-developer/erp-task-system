import { RelocationTaskModel } from 'features/warehouse/models'
import { RelocationTaskRequestArgs } from 'features/warehouse/types'

export type CloseRelocationTaskMutationArgs = RelocationTaskRequestArgs
export type CloseRelocationTaskSuccessResponse = Pick<RelocationTaskModel, 'status'>
