import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'

import { RelocationTaskModel } from './relocationTask.model'

export type CreateRelocationTaskMutationArgs = {
  deadlineAt: string
  relocateFromId: IdType
  relocateToId: IdType
  executor: IdType
  equipments: {
    id: IdType
    quantity: number
    condition: EquipmentConditionEnum

    price?: number
    currency?: IdType
  }[]

  comment?: string
}

export type CreateRelocationTaskSuccessResponse = RelocationTaskModel

export type CreateRelocationBadRequestErrorResponse = Partial<CreateRelocationTaskMutationArgs>
