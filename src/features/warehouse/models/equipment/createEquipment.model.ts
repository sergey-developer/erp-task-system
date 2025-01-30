import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { EquipmentModel } from 'features/warehouse/models'

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
  inventoryNumber?: string
  serialNumber?: string
  quantity?: number
  price?: number
  currency?: IdType
  usageCounter?: number
  owner?: IdType
  macroregion?: IdType
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
