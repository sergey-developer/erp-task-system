import { RelocationTaskModel } from 'modules/warehouse/models'
import { BaseRelocationTaskRequestArgs } from 'modules/warehouse/types'

export type CancelRelocationTaskMutationArgs = BaseRelocationTaskRequestArgs
export type CancelRelocationTaskSuccessResponse = Pick<RelocationTaskModel, 'status'>
