import { RelocationTaskModel } from 'modules/warehouse/models'
import { RelocationTaskRequestArgs } from 'modules/warehouse/types'

export type CloseRelocationTaskMutationArgs = RelocationTaskRequestArgs
export type CloseRelocationTaskSuccessResponse = Pick<RelocationTaskModel, 'status'>
