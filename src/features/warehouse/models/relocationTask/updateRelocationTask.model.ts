import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { RelocationTaskTypeEnum } from 'features/warehouse/constants/relocationTask'
import { RequestWithRelocationTask } from 'features/warehouse/types'

import { IdType } from 'shared/types/common'

import { RelocationTaskModel } from './relocationTask.model'

export type UpdateRelocationTaskRequest = RequestWithRelocationTask & {
  type: RelocationTaskTypeEnum
  deadlineAt: string
  executors: IdType[]
  equipments: {
    id: IdType
    quantity: number
    condition: EquipmentConditionEnum

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

export type UpdateRelocationTaskResponse = RelocationTaskModel
