import { TaskRequestArgs } from 'features/task/types'

import { InitiationReasonModel } from './initiationReason.model'

export type CreateInitiationReasonRequest = TaskRequestArgs & {
  title: string
  equipmentType: string
  malfunction: string
  inventoryNumber?: string
}

export type CreateInitiationReasonResponse = InitiationReasonModel
