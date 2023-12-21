import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'

import { RelocationTaskModel } from './relocationTask.model'

export type CreateRelocationTaskMutationArgs = {
  type: RelocationTaskTypeEnum
  deadlineAt: string
  relocateFromId: IdType
  executor: IdType
  equipments: {
    id: IdType
    quantity: number
    condition: EquipmentConditionEnum

    price?: number
    currency?: IdType
    attachments?: IdType[]
  }[]

  relocateToId?: IdType
  comment?: string
}

export type CreateRelocationTaskSuccessResponse = RelocationTaskModel
