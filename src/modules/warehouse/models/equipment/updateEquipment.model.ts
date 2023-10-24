import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentListItemModel } from 'modules/warehouse/models'
import { BaseEquipmentRequestArgs } from 'modules/warehouse/types'

import { IdType } from 'shared/types/common'

export type UpdateEquipmentMutationArgs = BaseEquipmentRequestArgs & {
  title: string
  nomenclature: IdType
  condition: EquipmentConditionEnum
  category: IdType
  purpose: IdType

  warehouse?: IdType
  isNew?: boolean
  isWarranty?: boolean
  isRepaired?: boolean
  customerInventoryNumber?: string
  serialNumber?: string
  price?: number
  currency?: IdType
  usageCounter?: number
  owner?: IdType
  comment?: string
}

export type UpdateEquipmentSuccessResponse = EquipmentListItemModel

export type UpdateEquipmentBadRequestErrorResponse = Partial<UpdateEquipmentMutationArgs>
