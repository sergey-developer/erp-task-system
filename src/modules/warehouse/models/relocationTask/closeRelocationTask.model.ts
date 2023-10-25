import { RelocationTaskModel } from 'modules/warehouse/models'
import { BaseRelocationTaskRequestArgs } from 'modules/warehouse/types'

export type CloseRelocationTaskMutationArgs = BaseRelocationTaskRequestArgs
export type CloseRelocationTaskSuccessResponse = Pick<RelocationTaskModel, 'status'>
