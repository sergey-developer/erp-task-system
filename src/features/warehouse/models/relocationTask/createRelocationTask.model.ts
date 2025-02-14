import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { RelocationTaskTypeEnum } from 'features/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'

import { RelocationTaskModel } from './relocationTask.model'

export type CreateRelocationTaskRequest = {
  type: RelocationTaskTypeEnum
  deadlineAt: string
  executors: IdType[]
  equipments: {
    id: IdType
    condition: EquipmentConditionEnum

    quantity?: number
    price?: number
    currency?: IdType
    attachments?: IdType[]
  }[]

  controller?: IdType
  controllers?: IdType[]
  inventorization?: IdType
  relocateFromId?: IdType
  relocateToId?: IdType
  comment?: string
  images?: IdType[]
}

export type CreateRelocationTaskResponse = RelocationTaskModel
