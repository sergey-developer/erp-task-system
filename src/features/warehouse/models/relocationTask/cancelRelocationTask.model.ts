import { RelocationTaskModel } from 'features/warehouse/models'
import { RequestWithRelocationTask } from 'features/warehouse/types'

export type CancelRelocationTaskRequest = RequestWithRelocationTask
export type CancelRelocationTaskResponse = Pick<RelocationTaskModel, 'status'>
