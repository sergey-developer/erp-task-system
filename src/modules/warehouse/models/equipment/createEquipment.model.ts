import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentListItemModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type CreateEquipmentMutationArgs = {
  title: string
  nomenclature: IdType
  warehouse: IdType
  condition: EquipmentConditionEnum
  category: IdType
  isNew: boolean
  isWarranty: boolean
  isRepaired: boolean
  purpose: IdType

  customerInventoryNumber?: string
  serialNumber?: string
  quantity?: number
  price?: number
  currency?: IdType
  usageCounter?: number
  owner?: IdType
  comment?: string
}

export type CreateEquipmentSuccessResponse = EquipmentListItemModel

export type CreateEquipmentBadRequestErrorResponse = Partial<CreateEquipmentMutationArgs>
