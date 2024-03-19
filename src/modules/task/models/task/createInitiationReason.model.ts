import { BaseTaskRequestArgs } from 'modules/task/types'

import { InitiationReasonModel } from './initiationReason.model'

export type CreateInitiationReasonMutationArgs = BaseTaskRequestArgs & {
  title: string
  equipmentType: string
  malfunction: string
  inventoryNumber?: string
}

export type CreateInitiationReasonSuccessResponse = InitiationReasonModel
