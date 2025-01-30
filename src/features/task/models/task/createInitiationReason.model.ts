import { TaskRequestArgs } from 'features/task/types'

import { InitiationReasonModel } from './initiationReason.model'

export type CreateInitiationReasonMutationArgs = TaskRequestArgs & {
  title: string
  equipmentType: string
  malfunction: string
  inventoryNumber?: string
}

export type CreateInitiationReasonSuccessResponse = InitiationReasonModel
