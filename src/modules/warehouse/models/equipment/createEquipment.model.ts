import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type CreateEquipmentMutationArgs = {
  title: string
  nomenclature: IdType
  warehouse: IdType
  condition: EquipmentConditionEnum
  category: IdType
  purpose: IdType

  isNew?: boolean
  isWarranty?: boolean
  isRepaired?: boolean
  customerInventoryNumber?: string
  serialNumber?: string
  quantity?: number
  price?: number
  currency?: IdType
  usageCounter?: number
  owner?: IdType
  comment?: string
}

export type CreateEquipmentSuccessResponse = Pick<
  EquipmentModel,
  | 'id'
  | 'title'
  | 'serialNumber'
  | 'inventoryNumber'
  | 'warehouse'
  | 'condition'
  | 'quantity'
  | 'category'
  | 'purpose'
  | 'price'
  | 'currency'
  | 'amount'
>

export type CreateEquipmentBadRequestErrorResponse = Partial<CreateEquipmentMutationArgs>
