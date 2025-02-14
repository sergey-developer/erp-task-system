import { EquipmentConditionEnum } from 'features/equipments/api/constants'

import { IdType } from 'shared/types/common'

import { RelocationTaskTypeEnum } from '../constants'
import { RelocationTaskDetailDTO } from '../dto'

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

export type CreateRelocationTaskResponse = RelocationTaskDetailDTO
