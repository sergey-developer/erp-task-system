import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { EquipmentListItemModel } from 'features/warehouse/models'
import { EquipmentRequestArgs } from 'features/warehouse/types'

import { IdType } from 'shared/types/common'

export type UpdateEquipmentMutationArgs = EquipmentRequestArgs & {
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

export type UpdateEquipmentSuccessResponse = EquipmentListItemModel

export type UpdateEquipmentBadRequestErrorResponse = Partial<UpdateEquipmentMutationArgs>
