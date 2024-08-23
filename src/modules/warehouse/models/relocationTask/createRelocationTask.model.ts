import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'

import { RelocationTaskModel } from './relocationTask.model'

export type CreateRelocationTaskMutationArgs = {
  type: RelocationTaskTypeEnum
  deadlineAt: string
  executors: IdType[]
  controller: IdType
  equipments: {
    id: IdType
    condition: EquipmentConditionEnum

    quantity?: number
    price?: number
    currency?: IdType
    attachments?: IdType[]
  }[]

  inventorization?: IdType
  relocateFromId?: IdType
  relocateToId?: IdType
  comment?: string
  images?: IdType[]
}

export type CreateRelocationTaskSuccessResponse = RelocationTaskModel
