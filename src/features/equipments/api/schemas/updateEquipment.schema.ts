import { EquipmentConditionEnum } from 'features/equipments/api/constants'

import { IdType } from 'shared/types/common'

import { EquipmentDTO } from '../dto'
import { EquipmentRequestArgs } from '../types'

export type UpdateEquipmentRequest = EquipmentRequestArgs & {
  title: string
  nomenclature: IdType
  condition: EquipmentConditionEnum
  category: IdType
  purpose: IdType

  warehouse?: IdType
  isNew?: boolean
  isWarranty?: boolean
  isRepaired?: boolean
  inventoryNumber?: string
  serialNumber?: string
  price?: number
  currency?: IdType
  usageCounter?: number
  owner?: IdType
  comment?: string
  images?: IdType[]
}

export type UpdateEquipmentResponse = EquipmentDTO

export type UpdateEquipmentBadRequestErrorResponse = Partial<UpdateEquipmentRequest>
