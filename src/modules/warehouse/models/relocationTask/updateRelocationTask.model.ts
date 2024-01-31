import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'
import { BaseRelocationTaskRequestArgs } from 'modules/warehouse/types'

import { IdType } from 'shared/types/common'

import { RelocationTaskModel } from './relocationTask.model'

export type UpdateRelocationTaskMutationArgs = BaseRelocationTaskRequestArgs & {
  type: RelocationTaskTypeEnum
  deadlineAt: string
  relocateFromId: IdType
  equipments: {
    id: IdType
    quantity: number
    condition: EquipmentConditionEnum

    price?: number
    currency?: IdType
    attachments?: IdType[]
  }[]

  relocateToId?: IdType
  controller?: IdType
  executor?: IdType
  comment?: string
  images?: IdType[]
}

export type UpdateRelocationTaskSuccessResponse = RelocationTaskModel
