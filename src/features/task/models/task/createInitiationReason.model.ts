import { RequestWithTask } from 'features/task/types'

import { InitiationReasonModel } from './initiationReason.model'

export type CreateInitiationReasonRequest = RequestWithTask & {
  title: string
  equipmentType: string
  malfunction: string
  inventoryNumber?: string
}

export type CreateInitiationReasonResponse = InitiationReasonModel
