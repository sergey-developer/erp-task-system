import { RelocationTaskModel } from 'features/warehouse/models'
import { RequestWithRelocationTask } from 'features/warehouse/types'

export type CloseRelocationTaskRequest = RequestWithRelocationTask
export type CloseRelocationTaskResponse = Pick<RelocationTaskModel, 'status'>
