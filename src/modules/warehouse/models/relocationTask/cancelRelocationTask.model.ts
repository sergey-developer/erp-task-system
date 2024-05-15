import { RelocationTaskModel } from 'modules/warehouse/models'
import { RelocationTaskRequestArgs } from 'modules/warehouse/types'

export type CancelRelocationTaskMutationArgs = RelocationTaskRequestArgs
export type CancelRelocationTaskSuccessResponse = Pick<RelocationTaskModel, 'status'>
