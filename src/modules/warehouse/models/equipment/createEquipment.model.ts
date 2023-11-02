import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentModel } from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type CreateEquipmentMutationArgs = {
  title: string
  nomenclature: IdType
  location: IdType
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
  images?: IdType[]
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
> & {
  availableQuantity: number
}

export type CreateEquipmentBadRequestErrorResponse = Partial<CreateEquipmentMutationArgs>
