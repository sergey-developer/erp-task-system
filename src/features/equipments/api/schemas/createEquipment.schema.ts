import { EquipmentConditionEnum } from 'features/equipments/api/constants'

import { IdType } from 'shared/types/common'

import { EquipmentDetailDTO } from '../dto'

export type CreateEquipmentRequest = {
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

export type CreateEquipmentResponse = Pick<
  EquipmentDetailDTO,
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

export type CreateEquipmentBadRequestErrorResponse = Partial<CreateEquipmentRequest>
