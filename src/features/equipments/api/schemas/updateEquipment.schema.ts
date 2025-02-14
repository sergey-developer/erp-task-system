import { EquipmentConditionEnum } from 'features/equipments/api/constants'

import { IdType } from 'shared/types/common'

import { EquipmentDTO } from '../dto'
import { RequestWithEquipment } from '../types'

export type UpdateEquipmentRequest = RequestWithEquipment & {
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

export type UpdateEquipmentBadRequestResponse = Partial<UpdateEquipmentRequest>
