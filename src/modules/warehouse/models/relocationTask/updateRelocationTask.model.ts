import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'
import { RelocationTaskRequestArgs } from 'modules/warehouse/types'

import { IdType } from 'shared/types/common'

import { RelocationTaskModel } from './relocationTask.model'

export type UpdateRelocationTaskMutationArgs = RelocationTaskRequestArgs & {
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
  executor?: IdType
  comment?: string
}

export type UpdateRelocationTaskSuccessResponse = RelocationTaskModel

export type UpdateRelocationBadRequestErrorResponse = Partial<UpdateRelocationTaskMutationArgs>
