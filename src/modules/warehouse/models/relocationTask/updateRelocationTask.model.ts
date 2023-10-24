import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { BaseRelocationTaskRequestArgs } from 'modules/warehouse/types'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { IdType } from 'shared/types/common'

import { RelocationTaskModel } from './relocationTask.model'

export type UpdateRelocationTaskMutationArgs = BaseRelocationTaskRequestArgs & {
  deadlineAt: string
  relocateFromId: IdType
  relocateFromType: LocationTypeEnum
  relocateToId: IdType
  relocateToType: LocationTypeEnum
  equipments: {
    id: IdType
    quantity: number
    condition: EquipmentConditionEnum

    price?: number
    currency?: IdType
  }[]

  executor?: IdType
  comment?: string
}

export type UpdateRelocationTaskSuccessResponse = RelocationTaskModel

export type UpdateRelocationBadRequestErrorResponse = Partial<UpdateRelocationTaskMutationArgs>
